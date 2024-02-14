import StorageView from "@/components/StorageView";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "@/libs/utils/apiClient";
import { toast } from "react-toastify";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

const DisplayListings = () => {
  const { data } = useQuery({
    queryKey: "my-listings",
    queryFn: () => apiClient.get("my-listings"),
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const within1Week = (date) => {
    const ms_Week = 7 * 24 * 60 * 60 * 1000;
    return Date.now() - Date.parse(date) < ms_Week;
  };
  return (
    <section>
      <Link
        to="create-new"
        className="fixed z-10 btn btn-info btn-sm bottom-4 right-[4.25rem] xs:right-8 md:btn-md">
        <PlusCircleIcon className="w-6 inline-block" />
        Create New
      </Link>
      <section className="grid justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((storageData, index) => (
          <StorageView
            key={index}
            {...storageData}
            isNew={within1Week(storageData.lastUpdated)}
          />
        ))}
      </section>
    </section>
  );
};

export default DisplayListings;
