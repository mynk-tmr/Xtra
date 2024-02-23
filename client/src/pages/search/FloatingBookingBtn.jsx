import { HeartIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";

const FloatingBookingBtn = ({ storageData, user }) => (
  <div className="bg-success p-1 cursor-pointer z-50 m-1 opacity-0 group-hover:opacity-100 transition-opacity absolute top-0">
    {storageData.id == user.id ? (
      <span>
        {user.firstName} <HeartIcon className="size-4 inline" />{" "}
      </span>
    ) : (
      <Link to="/mybookings" state={{ storageData }}>
        Book <HeartIcon className="size-4 inline" />
      </Link>
    )}
  </div>
);

export default FloatingBookingBtn;
