import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const notifyOfSuccessfulLogin = () => {
  toast.success("You are now logged in!");
};
