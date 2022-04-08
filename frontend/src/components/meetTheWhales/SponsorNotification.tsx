import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const notifyOfSuccessfulSponsor = () => {
  toast.success("Thank you for your support!", {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true,
  });
};
