import { useLocation } from "react-router-dom";
import AddBookingPage from "./AddBookingPage";
import ListBookings from "./ListBookings";

const BookingsPage = () => {
  const { state } = useLocation();
  if (state && state.storageData)
    return <AddBookingPage storageData={state.storageData} />;

  return <ListBookings />;
};

export default BookingsPage;
