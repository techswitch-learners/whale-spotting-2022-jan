import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { POSITION } from "react-toastify/dist/utils";

toast.configure();

export const notifyOfSuccessfulLogin = () => {
  toast.success("You are now logged in!", {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true,
  });
};
