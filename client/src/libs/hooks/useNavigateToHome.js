import { useNavigate } from "react-router-dom";

export default function () {
  const goto = useNavigate();
  return function (timeout = 0) {
    setTimeout(() => goto("/", { replace: true }), timeout);
  };
}
