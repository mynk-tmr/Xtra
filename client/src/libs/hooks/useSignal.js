import { useState } from "react";

export default function (init) {
  const [state, setState] = useState(init);
  return {
    get value() {
      return state;
    },
    set value(_new) {
      setState(_new);
    },
  };
}
