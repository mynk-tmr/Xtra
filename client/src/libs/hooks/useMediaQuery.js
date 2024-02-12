import { useState } from "react";

export default function (query) {
  const mql = window?.matchMedia(query);
  /* mediaquerylist object has props matches & onchange */
  const [active, setActive] = useState(mql.matches);
  mql.onchange = (e) => setActive(e.matches);
  return active;
}
