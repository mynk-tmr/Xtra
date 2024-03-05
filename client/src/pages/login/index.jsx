import Xtralogo from "@/components/Xtralogo";
import { Outlet } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "@/libs/utils/apiClient";
import { notifyError } from "@/libs/utils/toast";
import LoadingDots from "@/components/LoadingDots";
import { useAppContext } from "@/contexts/AppContext";

const LoginPage = () => {
  //here we define handlers that our forms can use from outletcontext
  const onError = (errors) => {
    notifyError(errors[0]);
  };

  const { verifyUser } = useAppContext();

  const { mutate: submitUserInfo, status } = useMutation({
    mutationFn: apiClient.post,
    onSuccess: verifyUser,
    onError: notifyError,
  });

  if (status == "pending") {
    return (
      <LoadingDots>
        <h4>Please wait ....</h4>
      </LoadingDots>
    );
  }

  return (
    <section className="prose mx-auto">
      <h1>
        Step into the <Xtralogo className="text-5xl" /> Zone
      </h1>
      <Outlet context={{ onError, submitUserInfo }} />
    </section>
  );
};

export default LoginPage;
