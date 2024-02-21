import { Bars3Icon } from "@heroicons/react/16/solid";
import Searchform from "./SearchForm/Form";
import { useQuery } from "react-query";
import { notifyError, notifySuccess } from "@/libs/utils/toast";
import LoadingDots from "@/components/LoadingDots";
import * as apiClient from "@/libs/utils/apiClient";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StorageView from "@/components/StorageView";

const SearchPageLayout = () => {
  const [searchPars, setSearchPars] = useSearchParams();
  const [withData, setWithData] = useState();
  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: "searchedListings",
    queryFn: async () => await apiClient.searchListings(searchPars),
    onError: (err) => {
      notifyError(err);
      setSearchPars();
    },
    onSuccess: () => notifySuccess("Search Results fetched"),
  });

  function onValid(formValues) {
    for (let key in formValues) {
      if (!formValues[key]) delete formValues[key];
    }
    setSearchPars(formValues);
    setTimeout(refetch, 0);
  }

  function resetter() {
    setWithData();
    setSearchPars();
  }

  useEffect(() => {
    let json = {};
    for (let [key, value] of searchPars.entries()) {
      if (!json[key]) json[key] = value;
      else json[key] = [[json[key]], value].flat(Infinity);
    }
    setWithData(json);
  }, [searchPars]);

  if (isLoading) {
    <LoadingDots>
      <h1 className="text-3xl">Loading search results ....</h1>
    </LoadingDots>;
  }

  return (
    <section>
      {!data?.length && isSuccess && (
        <section className="m-6 text-xl">
          There seems to be no listing that match your criteria. Try with
          different filters..😅
        </section>
      )}
      <nav
        className="bg-white w-fit rounded-lg border border-gray-200 min-w-96 mx-auto"
        aria-label="Search menu">
        <details open className="w-[calc(100vw-4rem)]">
          <summary className="flex rounded-t-lg cursor-pointer select-none items-center justify-between bg-accent px-5 py-3 hover:opacity-90">
            <span className="text-sm font-bold"> Toogle Search Filters</span>
            <Bars3Icon className="size-5" />
          </summary>
          <Searchform {...{ onValid, withData, resetter }} />
        </details>
      </nav>
      {data && (
        <section className="mt-6 grid justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.map((storageData, index) => (
            <StorageView key={index} {...storageData} />
          ))}
        </section>
      )}
    </section>
  );
};

export default SearchPageLayout;
