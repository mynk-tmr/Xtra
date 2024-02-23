import { useMutation } from "@tanstack/react-query";
import * as apiClient from "@/libs/utils/apiClient";
import { toast } from "react-toastify";
import { useAppContext } from "@/contexts/AppContext";

const LogOutHandler = () => {
  const { verifyUser } = useAppContext();
  const { mutate: logOut, status } = useMutation({
    mutationFn: () => apiClient.post({ endpoint: "authorize/logout" }),
    onSuccess: function () {
      toast.success("Signed Out !");
      verifyUser();
    },
    onError: function () {
      toast.error("Couldn't Logout. Maybe Try again !");
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
