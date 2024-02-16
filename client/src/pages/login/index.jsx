import Xtralogo from "@/components/Xtralogo";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import useTokenInvalidator from "@/libs/hooks/useTokenInvalidator";
import * as apiClient from "@/libs/utils/apiClient";
import { notifyError, notifySuccess } from "@/libs/utils/toast";

const LoginPage = () => {
  const { state } = useLocation(); //the state pushed by AuthRequired
  const goto = useNavigate();

  //here we define handlers that our forms can use from outletcontext
  const onError = (errors) => {
    notifyError(errors[0]);
  };

  const invalidator = useTokenInvalidator();

  const { mutate: submitUserInfo, isLoading } = useMutation({
    mutationFn: apiClient.post,
    onSuccess: async function () {
      notifySuccess("You are signed in! 😎");
      await invalidator();
      goto(state?.from ?? "/", { replace: true }); //redirect user to where he wanted to go
    },
    onError: notifyError,
  });

  return (
    <section className="p-8 prose mx-auto pb-40">
      <h1>
        Step into the <Xtralogo className="text-5xl" /> Zone
      </h1>
      <Outlet context={{ onError, submitUserInfo, isLoading }} />
    </section>
  );
};

export default LoginPage;
