import { Form, useNavigate } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/init";
import { toast } from "react-toastify";
import { useState } from "react";
import Button from "../common/components/Button";

const ForgotPassword = () => {
  document.title = "real-Estate | Password Reset";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const goto = useNavigate();
  return (
    <Form
      className="mt-8 grid gap-y-2"
      onSubmit={async (ev) => {
        ev.preventDefault();
        setLoading(true);
        try {
          await sendPasswordResetEmail(auth, email);
          toast.success("Reset Email was sent !");
          goto("/login");
        } catch (error) {
          toast.error(error?.code?.slice(5));
        } finally {
          setLoading(false);
        }
      }}>
      <Input
        type="email"
        label="Your registered email"
        required
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
      />
      <Button type="submit" color="blue" loading={loading}>
        Send Verification
      </Button>
    </Form>
  );
};

export default ForgotPassword;
