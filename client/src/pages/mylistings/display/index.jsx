import StorageView from "@/components/StorageView";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "@/libs/utils/apiClient";
import { toast } from "react-toastify";
import {
  PlusCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

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
          <article key={index} className="relative group">
            <div className="hidden group-hover:flex gap-5 absolute z-10 top-12 left-1/4 *:btn-sm *:btn">
              <Link to={`edit/${storageData._id}`}>
                <PencilIcon className="w-6" /> Edit
              </Link>
              <button className="btn-error !text-white">
                <TrashIcon className="w-6" /> Delete
              </button>
            </div>
            <div className="group-hover:blur-[1px]">
              <StorageView
                {...storageData}
                isNew={within1Week(storageData.lastUpdated)}
              />
            </div>
          </article>
        ))}
      </section>
    </section>
  );
};

export default DisplayListings;
