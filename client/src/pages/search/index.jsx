import { Bars3Icon } from "@heroicons/react/16/solid";
import Searchform from "./SearchForm/Form";
import { useQuery } from "react-query";
import { notifyError } from "@/libs/utils/toast";
import LoadingDots from "@/components/LoadingDots";
import * as apiClient from "@/libs/utils/apiClient";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const SearchPageLayout = () => {
  const [searchPars, setSearchPars] = useSearchParams();
  const [withData, setWithData] = useState();
  function onValid(formValues) {
    for (let key in formValues) if (!formValues[key]) delete formValues[key];
    setSearchPars(formValues);
  }
  useEffect(() => {
    let json = {};
    for (let [key, value] of searchPars.entries()) {
      if (!json[key]) json[key] = value;
      else json[key] = [[json[key]], value].flat(Infinity);
    }
    setWithData(json);
  }, [searchPars]);

  return (
    <section>
      <nav
        className="bg-white w-fit rounded-lg border border-gray-200 min-w-96 mx-auto"
        aria-label="Search menu">
        <details open className="w-full">
          <summary className="flex rounded-t-lg cursor-pointer select-none items-center justify-between bg-accent px-5 py-3">
            <span className="text-sm font-medium"> Toggle Filters </span>
            <Bars3Icon className="size-5" />
          </summary>
          <Searchform onValid={onValid} init={withData} />
        </details>
      </nav>
    </section>
  );
};

export default SearchPageLayout;
