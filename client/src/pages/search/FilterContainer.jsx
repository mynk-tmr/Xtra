import { Bars3Icon } from "@heroicons/react/16/solid";
import Searchform from "./SearchForm/Form";

const FilterContainer = ({ refetch, withData, setSearchPars }) => {
  function onValid(formValues) {
    for (let key in formValues) {
      if (!formValues[key]) delete formValues[key];
    }
    setSearchPars(formValues); //handles obj to q-param
    setTimeout(refetch, 0);
  }

  return (
    <nav
      className="bg-white bottom-0 w-fit rounded-lg border border-gray-200 mx-auto"
      aria-label="Search menu">
      <details className="relative w-[calc(100vw-4rem)]">
        <summary className="flex rounded-t-lg cursor-pointer select-none items-center justify-between bg-secondary px-5 py-3 hover:opacity-90">
          <span className="text-sm font-bold"> Toggle Search Filters</span>
          <Bars3Icon className="size-5" />
        </summary>
        <Searchform {...{ onValid, withData, setSearchPars }} />
      </details>
    </nav>
  );
};

export default FilterContainer;
