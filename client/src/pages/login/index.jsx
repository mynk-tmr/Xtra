import Xtralogo from "@/components/Xtralogo";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import useTokenInvalidator from "@/libs/hooks/useTokenInvalidator";
import * as apiClient from "@/libs/utils/apiClient";

const LoginPage = () => {
  const { state } = useLocation(); //the state pushed by AuthRequired
  const goto = useNavigate();

  //here we define handlers that our forms can use from outletcontext
  const onError = (errors) => {
    const { message } = Object.values(errors).at(0);
    toast.error(message.toUpperCase());
  };

  const invalidator = useTokenInvalidator();

  const { mutate: submitUserInfo, isLoading } = useMutation({
    mutationFn: apiClient.post,
    onSuccess: async function () {
      toast.success("You are signed in! 😎");
      await invalidator();
      goto(state?.from ?? "/", { replace: true }); //redirect user to where he wanted to go
    },
    onError: function (error) {
      toast.error(error.message + "  😥");
    },
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
