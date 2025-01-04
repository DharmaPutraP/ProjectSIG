import { Form, redirect } from "react-router-dom";
import { InputLogin, SubmitBtn } from "../components";
import { toLogin } from "../utils/api";
import { toast } from "react-toastify";
import getUserData from "../utils/getUserData";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: "" };
  try {
    const response = await toLogin(data);
    const { token, user } = response.data;

    // Save user data in localStorage
    localStorage.setItem("user", JSON.stringify(user));
    toast.success("Berhasil Login");
    return redirect("/detail");
  } catch (error) {
    errors.msg =
      error?.response?.data?.message ||
      "Something went wrong. Please try again.";
    toast.error(errors.msg);
    return errors;
  }
};

const Login = () => {
  const user = getUserData();
  return (
    <>
      <div className="flex flex-col h-screen align-center justify-center items-center">
        <div className="font-bold text-4xl mb-4">Fortune</div>
        <div className="font-semibold text-2xl mb-2 text-green-400">Login</div>
        <Form
          method="post"
          className="border p-5 rounded-xl border-0 shadow-xl"
        >
          <InputLogin
            type="text"
            name="username"
            placeholder="Username"
            icon={false}
          />
          <InputLogin
            type="password"
            name="password"
            placeholder="Password"
            icon={false}
          />
          <SubmitBtn />
        </Form>
      </div>
    </>
  );
};

export default Login;
