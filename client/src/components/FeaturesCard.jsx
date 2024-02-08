const FeaturesCard = ({ bigIcon, title, points, listIcon }) => {
  return (
    <article className="[&_svg]:inline adjusticons">
      <h3 className="py-2 px-4 [&_svg]:size-7 bg-white rounded-full">
        {bigIcon} {title}
      </h3>
      <ul className="focus:outline-dotted focus:outline-2 !block" tabIndex={0}>
        {points?.map((point, index) => (
          <li key={index} className="[&_svg]:size-4">
            {listIcon} {point}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default FeaturesCard;
