import { useQuery } from "react-query";
import { notifyError } from "@/libs/utils/toast";
import LoadingDots from "@/components/LoadingDots";
import * as apiClient from "@/libs/utils/apiClient";
import StorageView from "@/components/StorageView";
import FilterContainer from "./FilterContainer";
import { Link, useSearchParams } from "react-router-dom";
import { fromEntriesv2 } from "@/libs/utils/convertors";
import Pagination from "./Pagination";
import { useEffect } from "react";
import { HeartIcon } from "@heroicons/react/16/solid";
import usePageTitle from "@/libs/hooks/usePageTitle";

const SearchPage = () => {
  usePageTitle("Xtra | Search");
  const [searchPars, setSearchPars] = useSearchParams();
  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: "searchedListings",
    staleTime: 5 * 60 * 1000,
    queryFn: async () => await apiClient.searchListings(searchPars),
    onError: notifyError,
  });

  useEffect(() => {
    refetch();
  }, [searchPars, refetch]);

  if (isLoading) {
    return (
      <LoadingDots>
        <h1>Loading search results ....</h1>
      </LoadingDots>
    );
  }

  return (
    <section>
      <FilterContainer
        {...{ refetch, withData: fromEntriesv2(searchPars), setSearchPars }}
      />
      {data && (
        <section className="mt-6 grid items-start justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.message.map((storageData, index) => (
            <article key={index} className="relative group">
              <StorageView {...storageData} />
              <Link
                to="/mybookings"
                state={{ storageData }}
                className="bg-success p-1 cursor-pointer z-50 m-1 opacity-0 group-hover:opacity-100 transition-opacity absolute top-0">
                Book <HeartIcon className="size-4 inline" />
              </Link>
            </article>
          ))}
        </section>
      )}
      {data && !data.message.length && isSuccess && (
        <section className="m-6 text-xl">
          There seems to be no listing that match your criteria. Try with
          different filters..😅
        </section>
      )}
      {data?.links && <Pagination links={data.links} />}
    </section>
  );
};

export default SearchPage;
