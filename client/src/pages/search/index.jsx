import { useQuery } from "react-query";
import { notifyError } from "@/libs/utils/toast";
import LoadingDots from "@/components/LoadingDots";
import * as apiClient from "@/libs/utils/apiClient";
import StorageView from "@/components/StorageView";
import FilterContainer from "./FilterContainer";
import { useSearchParams } from "react-router-dom";
import { fromEntriesv2 } from "@/libs/utils/convertors";
import Pagination from "./Pagination";
import { useEffect } from "react";

const SearchPage = () => {
  const [searchPars, setSearchPars] = useSearchParams();
  const { data, isLoading, isSuccess, refetch, isFetching } = useQuery({
    queryKey: "searchedListings",
    staleTime: 5 * 60 * 1000,
    queryFn: async () => await apiClient.searchListings(searchPars),
    onError: notifyError,
  });

  useEffect(() => {
    refetch();
  }, [searchPars, refetch]);

  if (isLoading || isFetching) {
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
        <section className="mt-6 grid justify-center gap-8 md:grid-cols-2 lg:grid-cols-3 bg-base-100">
          {data.message.map((storageData, index) => (
            <StorageView key={index} {...storageData} />
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
