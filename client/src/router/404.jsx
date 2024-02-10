import useNavigateToHome from "@/libs/hooks/useNavigateToHome";
import { useEffect } from "react";

const NotFound = () => {
  const goto = useNavigateToHome();
  useEffect(() => {
    document.activeElement?.blur();
    goto(1600);
  }, [goto]);
  return "Not found";
};

export default NotFound;
