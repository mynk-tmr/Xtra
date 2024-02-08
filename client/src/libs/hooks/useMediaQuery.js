import { useEffect, useState } from "react";

export default function (query) {
  const mql = window?.matchMedia(query);
  /* mediaquerylist object has props matches & onchange */
  const [active, setActive] = useState(mql.matches);
  useEffect(listener, [mql]);
  return active;

  function listener() {
    mql.onchange = (e) => setActive(e.matches);
  }
}
