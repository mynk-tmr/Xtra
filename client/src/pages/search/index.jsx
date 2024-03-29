import { useQuery } from "@tanstack/react-query";
import { notifyError } from "@/libs/utils/toast";
import LoadingDots from "@/components/LoadingDots";
import * as apiClient from "@/libs/utils/apiClient";
import StorageView from "@/components/StorageView";
import FilterContainer from "./FilterContainer";
import { useSearchParams } from "react-router-dom";
import { fromEntriesv2 } from "@/libs/utils/convertors";
import Pagination from "./Pagination";
import { useEffect } from "react";
import usePageTitle from "@/libs/hooks/usePageTitle";
import { useAppContext } from "@/contexts/AppContext";
import FloatingBookingBtn from "./FloatingBookingBtn";

const SearchPage = () => {
  usePageTitle("Xtra | Search");
  const [searchPars, setSearchPars] = useSearchParams();
  const { user } = useAppContext();
  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["searchResults"],
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
      <section ref={(node) => node?.scrollIntoView({ behavior: "smooth" })}>
        {data && (
          <section className="mt-6 grid items-start justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.message.map((storageData, index) => (
              <article key={index} className="relative group">
                <StorageView {...storageData} />
                <FloatingBookingBtn {...{ storageData, user }} />
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
      </section>
      {data?.links && <Pagination links={data.links} />}
    </section>
  );
};

export default SearchPage;
