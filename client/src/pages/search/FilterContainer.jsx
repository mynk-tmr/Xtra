import { Bars3Icon } from "@heroicons/react/16/solid";
import Searchform from "./SearchForm/Form";

const FilterContainer = ({ onValid, withData, resetter }) => {
  return (
    <nav
      className="bg-white bottom-0 w-fit rounded-lg border border-gray-200 mx-auto"
      aria-label="Search menu">
      <details className="relative w-[calc(100vw-4rem)]">
        <summary className="flex rounded-t-lg cursor-pointer select-none items-center justify-between bg-accent px-5 py-3 hover:opacity-90">
          <span className="text-sm font-bold"> Toogle Search Filters</span>
          <Bars3Icon className="size-5" />
        </summary>
        <Searchform {...{ onValid, withData, resetter }} />
      </details>
    </nav>
  );
};

export default FilterContainer;
