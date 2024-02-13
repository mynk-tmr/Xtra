import { Link } from "react-router-dom";

const DisplayListings = () => {
  return (
    <section>
      <Link to="create-new" className="btn btn-block">
        Create new Listing
      </Link>
    </section>
  );
};

export default DisplayListings;
