import { useMutation } from "react-query";
import * as apiClient from "@/libs/utils/apiClient";
import { toast } from "react-toastify";
import useTokenInvalidator from "@/libs/hooks/useTokenInvalidator";

const LogOutHandler = ({ handleLoading }) => {
  const invalidate = useTokenInvalidator();
  const { mutate: logOut, isLoading } = useMutation({
    mutationFn: () => apiClient.post({ endpoint: "authorize/logout" }),
    onSuccess: async function () {
      await invalidate();
      toast.success("Signed Out !");
    },
    onError: function () {
      toast.error("Couldn't Logout. Maybe Try again !");
    },
  });

  if (isLoading) handleLoading();

  return (
    <button onClick={logOut} className="btn btn-warning">
      Logout
    </button>
  );
};

export default LogOutHandler;
