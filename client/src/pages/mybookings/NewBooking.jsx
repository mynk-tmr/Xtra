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
  <section className="carousel carousel-center max-h-screen rounded-box">
    {urls.map((url, i) => (
      <div key={i} className="carousel-item w-full ">
        <img src={url} alt={"Storage Image " + i} />
      </div>
    ))}
  </section>
);

const NewBooking = ({ storageData, confirm }) => {
  return (
    <section className="grid adjusticons gap-y-12 [&_svg]:size-4">
      <article className="max-w-xl">
        <StorageView {...storageData} />
        <MenuBtns confirm={confirm} />
      </article>
      <article className="justify-self-center">
        <h1 className="mb-6 font-semibold text-info text-center">
          Swipe to see more images
        </h1>
        <Carousel urls={storageData.imageUrls.reverse()} />
      </article>
    </section>
  );
};

export default NewBooking;
