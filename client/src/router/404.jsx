import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const goto = useNavigate();
  setTimeout(() => goto("/"), 1600);
  return "Not found";
};

export default NotFound;
