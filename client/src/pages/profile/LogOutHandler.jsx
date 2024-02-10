import { useMutation } from "react-query";
import * as apiClient from "@/libs/utils/apiClient";
import { toast } from "react-toastify";
import useTokenInvalidator from "@/libs/hooks/useTokenInvalidator";
import useNavigateToHome from "@/libs/hooks/useNavigateToHome";

const LogOutHandler = () => {
  const invalidate = useTokenInvalidator();
  const goto = useNavigateToHome();
  const { mutate: logOut } = useMutation({
    mutationFn: () => apiClient.post({ endpoint: "authorize/logout" }),
    onSuccess: async function () {
      await invalidate();
      toast.success("Signed Out !");
      goto();
    },
    onError: function () {
      toast.error("Couldn't Logout. Maybe Try again !");
    },
  });
  return (
    <button onClick={logOut} className="btn btn-warning">
      Logout
    </button>
  );
};

export default LogOutHandler;
