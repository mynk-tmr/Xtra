import { useState } from "react";

export default function (init) {
  const [open, setOpen] = useState(init);
  const toggle = () => setOpen(!open);
  return [open, toggle];
}
