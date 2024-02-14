import { StarIcon, MapPinIcon } from "@heroicons/react/16/solid";

const StorageView = ({
  description,
  discount,
  entranceHeight,
  entranceWidth,
  facilities,
  type,
  imageUrls,
  isNew,
  locality,
  city,
  state,
  pricePerDay,
  starRating,
  storageSpace,
}) => {
  return (
    <article className="relative card bg-success shadow-xl">
      <div className="absolute top-0 right-0">
        <span className="flex font-bold backdrop-blur-sm justify-end mr-1">
          <StarIcon className="w-6 text-yellow-400" /> {starRating}
        </span>
        {isNew && (
          <div className="p-1 bg-accent text-sm pl-6 mt-2 rounded-l-md">
            NEW
          </div>
        )}
      </div>
      <figure className="-mb-14">
        <img
          src={imageUrls[0]}
          alt={"Picture of Storage"}
          className="flex-grow"
        />
      </figure>
      <div className="card-body gap-y-4">
        <h2 className="card-title w-fit bg-secondary rounded-md p-2">
          {!discount ? (
            pricePerDay
          ) : (
            <span className="flex-center gap-2">
              <del className="text-sm">{pricePerDay}</del>
              <ins>{pricePerDay - discount}</ins>
            </span>
          )}
          <small>₹ / day</small>
        </h2>
        <span className="flex-center *:badge flex-wrap gap-y-3">
          <i className="!badge-primary opacity-80">
            {entranceWidth} X {entranceHeight} ft.
          </i>
          <i className="!badge-warning opacity-80">{storageSpace} sq. feet</i>
          <i className="!bg-blue-200">{type}</i>
        </span>
        <address className="not-italic">
          <MapPinIcon className="w-4 inline" />{" "}
          <span>
            {locality},
            <small className="p-2">
              {city}, {state}
            </small>
          </span>
        </address>
        <quote className="font-mono text-sm opacity-90">{description}</quote>
        <div className="card-actions">
          {facilities?.map((facility, index) => (
            <span className="badge text-xs" key={index}>
              {facility}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default StorageView;
