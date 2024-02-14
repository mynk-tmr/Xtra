import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const goto = useNavigate();
  useEffect(() => {
    document.activeElement?.blur();
    setTimeout(goto, 1600, "/", { replace: true });
  }, [goto]);
  return "Not found";
};

export default NotFound;
