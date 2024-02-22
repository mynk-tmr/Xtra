import { StarIcon, MapPinIcon } from "@heroicons/react/16/solid";

const PriceBadge = ({ discount, pricePerDay }) => {
  return (
    <div className="p-1 bg-primary mt-2 rounded-l-md flex gap-1 items-center font-bold">
      {!discount ? (
        pricePerDay
      ) : (
        <span>
          <del className="text-xs mr-1">{pricePerDay}</del>
          <ins className="no-underline text-error">
            {pricePerDay - discount}
          </ins>
        </span>
      )}
      <small>₹ / day</small>
    </div>
  );
};

const within1Week = (date) => {
  const ms_Week = 7 * 24 * 60 * 60 * 1000;
  return Date.now() - Date.parse(date) < ms_Week;
};

const StorageView = ({
  description,
  discount,
  entranceHeight,
  entranceWidth,
  facilities,
  type,
  imageUrls,
  lastUpdated,
  locality,
  city,
  state,
  pricePerDay,
  starRating,
  storageSpace,
}) => {
  return (
    <figure className="shadow-xl">
      <article className="relative card h-96">
        <img
          src={imageUrls[0]}
          alt={"Picture of Storage"}
          className="absolute size-full rounded-t-md"
        />
        <div className="absolute top-0 right-0">
          <span className="flex text-yellow-400 font-bold justify-end mr-1">
            <StarIcon className="w-6" /> {starRating}
          </span>
          <PriceBadge discount={discount} pricePerDay={pricePerDay} />
          {within1Week(lastUpdated) && (
            <div className="p-1 pl-3 bg-accent text-sm mt-2 rounded-l-md ml-auto w-fit">
              NEW
            </div>
          )}
        </div>
        <div className="card-body gap-y-4 z-10 justify-end">
          <span className="flex-center *:badge *:badge-sm flex-wrap gap-y-3">
            <i className="!badge-secondary">
              {entranceWidth} X {entranceHeight} ft.
            </i>
            <i className="!badge-warning">{storageSpace} sq. feet</i>
            <i className="!badge-neutral">{type}</i>
          </span>
          <div className="card-actions">
            {facilities?.map((facility, index) => (
              <span className="badge badge-info text-xs" key={index}>
                {facility}
              </span>
            ))}
          </div>
          <address className="not-italic bg-base-100 p-1 text-sm *:mr-1">
            <MapPinIcon className="w-4 inline" />
            <span>{locality},</span>
            <small>
              {city}, {state}
            </small>
          </address>
        </div>
      </article>
      <figcaption className="font-mono text-sm bg-warning/50 p-2 rounded-b-md">
        <q>{description}</q>
      </figcaption>
    </figure>
  );
};

export default StorageView;
