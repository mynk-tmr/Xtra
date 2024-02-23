import { HeartIcon, CheckCircleIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";

const FloatingBookingBtn = ({ storageData, user }) => (
  <div className="*:p-1 z-10 m-1 opacity-0 group-hover:opacity-100 transition-opacity absolute top-0">
    {(() => {
      if (storageData.userId == user._id)
        return (
          <span className="bg-accent">
            {user.firstName} <HeartIcon className="size-4 inline" />
          </span>
        );
      if (user?.bookings?.some(({ assetId }) => assetId === storageData._id))
        return (
          <span className="bg-success">
            Already booked <CheckCircleIcon className="size-4 inline" />
          </span>
        );
      return (
        <Link
          to="/mybookings/add"
          className="cursor-pointer btn btn-error !px-5"
          state={{ storageData }}
          replace>
          Book <HeartIcon className="size-4 inline animate-bounce" />
        </Link>
      );
    })()}
  </div>
);

export default FloatingBookingBtn;
