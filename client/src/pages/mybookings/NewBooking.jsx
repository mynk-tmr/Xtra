import StorageView from "@/components/StorageView";
import { CheckBadgeIcon, ClockIcon } from "@heroicons/react/16/solid";

const MenuBtns = ({ confirm }) => (
  <menu className="flex *:grow *:border *:border-gray-500">
    <button className="btn btn-success" onClick={confirm}>
      Confirm <CheckBadgeIcon />{" "}
    </button>
    <button className="btn btn-success">
      Track <ClockIcon />{" "}
    </button>
  </menu>
);

const Carousel = ({ urls }) => (
  <section className="carousel carousel-center aspect-video max-w-3xl rounded-lg">
    {urls.map((url, i) => (
      //m-10 gives it a snappy feel
      <div key={i} className="mx-10 carousel-item w-full relative bg-black/80">
        <span className="absolute top-0 m-2 *:bg-primary">
          <b className="btn btn-circle">{i + 1}</b>
          <b className="p-1 opacity-70">
            {urls[i + 1] ? "Swipe to see More" : "End.."}
          </b>
        </span>
        <img src={url} className="mx-auto" alt={"Storage Image " + i + 1} />
      </div>
    ))}
  </section>
);

const NewBooking = ({ storageData, confirm }) => {
  return (
    <section className="flex gap-4 flex-wrap md:flex-nowrap adjusticons gap-y-12 [&_svg]:size-4 justify-center">
      <article className="min-w-96">
        <StorageView {...storageData} />
        <MenuBtns confirm={confirm} />
      </article>
      <Carousel urls={storageData.imageUrls.reverse()} />
    </section>
  );
};

export default NewBooking;
