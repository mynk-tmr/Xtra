const FeaturesCard = ({ bigIcon, title, points, listIcon }) => {
  return (
    <article className="[&_svg]:inline">
      <header className="py-2 px-4 font-bold flex gap-x-2 items-center text-xl [&_svg]:size-7 bg-white rounded-full">
        {bigIcon} {title}
      </header>
      <ul
        className="ml-6 mt-2 focus:outline-dotted focus:outline-2"
        tabIndex={0}>
        {points?.map((point, index) => (
          <li key={index} className="flex gap-3 [&_svg]:size-4 items-center">
            {listIcon} {point}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default FeaturesCard;
