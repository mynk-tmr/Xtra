import Xtralogo from "@/components/Xtralogo";
import FormContainer from "./Form/FormContainer";

const MyListingsPage = () => {
  return (
    <section className="p-8 mx-auto prose">
      <h1>
        Add your new <Xtralogo /> space
      </h1>
      <FormContainer />
    </section>
  );
};

export default MyListingsPage;
