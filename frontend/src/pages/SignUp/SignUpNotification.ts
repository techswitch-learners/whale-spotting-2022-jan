import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const notifyOfSuccessfulSignUp = () => {
  toast.success("Account created successfully!");
};
