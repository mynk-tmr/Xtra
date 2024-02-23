import { HeartIcon, CheckCircleIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";

const FloatingBookingBtn = ({ storageData, user }) => (
  <div className="bg-success p-1 z-50 m-1 opacity-0 group-hover:opacity-100 transition-opacity absolute top-0">
    {(() => {
      if (storageData.userId == user._id)
        return (
          <span>
            {user.firstName} <HeartIcon className="size-4 inline" />
          </span>
        );
      if (user?.bookings?.some(({ assetId }) => assetId === storageData._id))
        return (
          <span>
            Already booked <CheckCircleIcon className="size-4 inline" />
          </span>
        );
      return (
        <Link
          to="/mybookings"
          className="cursor-pointer"
          state={{ storageData }}>
          Book <HeartIcon className="size-4 inline" />
        </Link>
      );
    })()}
  </div>
);

export default FloatingBookingBtn;
