import { useQuery } from "react-query";
import { notifyError } from "@/libs/utils/toast";
import LoadingDots from "@/components/LoadingDots";
import * as apiClient from "@/libs/utils/apiClient";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StorageView from "@/components/StorageView";
import FilterContainer from "./FilterContainer";

const SearchPage = () => {
  const [searchPars, setSearchPars] = useSearchParams();
  const [withData, setWithData] = useState();
  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: "searchedListings",
    staleTime: Infinity,
    queryFn: async () => await apiClient.searchListings(searchPars),
    onError: (err) => {
      notifyError(err);
      setSearchPars();
    },
  });

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

  return (
    <section>
      <FilterContainer {...{ withData, onValid, resetter }} />
      {data && (
        <section
          ref={(node) => node?.scrollIntoView({ behavior: "smooth" })}
          className="mt-6 grid justify-center gap-8 md:grid-cols-2 lg:grid-cols-3 bg-base-100">
          {data.map((storageData, index) => (
            <StorageView key={index} {...storageData} />
          ))}
        </section>
      )}
      {!data?.length && isSuccess && (
        <section className="m-6 text-xl">
          There seems to be no listing that match your criteria. Try with
          different filters..😅
        </section>
      )}
    </section>
  );
};

export default SearchPage;
