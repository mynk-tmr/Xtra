import StorageView from "@/components/StorageView";
import useToggle from "@/libs/hooks/useToggle";
import {
  PencilIcon,
  TrashIcon,
  FaceSmileIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const EnhancedCard = ({ storageData, requestDelete }) => {
  const [shouldDelete, toggleMode] = useToggle(false);
  return (
    <article className="relative group [&_svg]:w-6">
      <div className="hidden group-hover:flex w-full gap-3 justify-center absolute z-10 top-12 *:btn-sm *:btn">
        {shouldDelete ? (
          <>
            <button
              onClick={() => requestDelete(storageData._id)}
              className="btn-error !text-white">
              <TrashIcon /> Yes I am sure
            </button>
            <button onClick={toggleMode} className="btn-success">
              <FaceSmileIcon /> No, Keep it.
            </button>
          </>
        ) : (
          <>
            <Link to={`edit/${storageData._id}`}>
              <PencilIcon /> Edit
            </Link>
            <button onClick={toggleMode} className="btn-error !text-white">
              <TrashIcon /> Delete
            </button>
          </>
        )}
      </div>
      <div className="group-hover:blur-[1px]">
        <StorageView {...storageData} />
      </div>
    </article>
  );
};

export default EnhancedCard;
