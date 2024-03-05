import { useMutation } from "@tanstack/react-query";
import * as apiClient from "@/libs/utils/apiClient";
import { useAppContext } from "@/contexts/AppContext";
import { notifyError } from "@/libs/utils/toast";

const LogOutHandler = () => {
  const { verifyUser } = useAppContext();
  const { mutate: logOut, status } = useMutation({
    mutationFn: () => apiClient.post({ endpoint: "authorize/logout" }),
    onSuccess: verifyUser,
    onError: () => {
      notifyError("Couldn't Logout. Maybe Try again !");
    },
  });

  return (
    <button
      disabled={status === "pending"}
      onClick={logOut}
      className="btn btn-warning">
      Logout
    </button>
  );
};

export default LogOutHandler;
