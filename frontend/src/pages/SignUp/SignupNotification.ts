import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const notifyOfSuccessfulSignup = () => {
  toast.success("You are now signed up! Please login to continue!");
};
