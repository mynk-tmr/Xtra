import Xtralogo from "@/components/Xtralogo";
import { Outlet } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "@/libs/utils/apiClient";
import { notifyError, notifySuccess } from "@/libs/utils/toast";
import LoadingDots from "@/components/LoadingDots";
import { useAppContext } from "@/contexts/AppContext";

const LoginPage = () => {
  //here we define handlers that our forms can use from outletcontext
  const onError = (errors) => {
    notifyError(errors[0]);
  };

  const { verifyUser } = useAppContext();

  const { mutate: submitUserInfo, isLoading } = useMutation({
    mutationFn: apiClient.post,
    onSuccess: async function () {
      notifySuccess("You are signed in! 😎");
      verifyUser();
    },
    onError: notifyError,
  });

  if (isLoading) {
    return (
      <LoadingDots>
        <h4>Registering your Account. Please wait ....</h4>
      </LoadingDots>
    );
  }

  return (
    <section className="prose mx-auto">
      <h1>
        Step into the <Xtralogo className="text-5xl" /> Zone
      </h1>
      <Outlet context={{ onError, submitUserInfo, isLoading }} />
    </section>
  );
};

export default LoginPage;
