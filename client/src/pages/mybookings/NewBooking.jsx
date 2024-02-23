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
  <section className="grid md:grid-cols-2 grow">
    {urls.map((url, i) => (
      <div key={i}>
        <img src={url} alt={"Storage Image " + i} />
      </div>
    ))}
  </section>
);

const NewBooking = ({ storageData, confirm }) => {
  return (
    <section className="flex gap-4 flex-wrap md:flex-nowrap adjusticons gap-y-12 [&_svg]:size-4">
      <article className="md:w-2/3">
        <StorageView {...storageData} />
        <MenuBtns confirm={confirm} />
      </article>
      <Carousel urls={storageData.imageUrls.reverse()} />
    </section>
  );
};

export default NewBooking;
