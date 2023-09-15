"use client";

import { LoginControls } from "@/assests/data";
import InputComponent from "@/components/Form/inputcomponents/InputComponents";
import Componentloader from "@/components/loaders/componentloader/componentloader";
import Notification from "@/components/notification/notification";

import { GlobalContext } from "@/context/context";
import { login } from "@/service/login";
import Cookies from "js-cookie";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialFormdata = {
  email: "",
  password: "",
};

function Login() {
  const [formData, setformData] = useState(initialFormdata);
  const {
    isAuthUser,
    setisAuthUser,
    user,
    setuser,
    componentsLoader,
    setcomponentsLoader,
  } = useContext(GlobalContext);
  function isValidForm() {
    return formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }
  async function handleLogin() {
    setcomponentsLoader({ loading: true, id: "" });
    const res = await login(formData);

    console.log(res);

    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setisAuthUser(true);
      setuser(res?.finalData?.user);
      setformData(initialFormdata);
      Cookies.set("token", res?.finalData?.token);
      localStorage.setItem("user", JSON.stringify(res?.finalData?.user));
      setcomponentsLoader({ loading: false, id: "" });
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setisAuthUser(false);
      setcomponentsLoader({ loading: false, id: "" });
    }
  }

  console.log(isAuthUser, user);

  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);

  const router = useRouter();
  return (
    <>
      <div className="bg-white relative">
        <div className="flex flex-col items-start justify-between pt-0 lg:pr-10 pb-0 lg:pl-10 px-4 mt-8 mr-auto  xl:px-5 lg:flex-row">
          <div className="flex flex-col justify-center items-center w-full gap-5 h-full lg:pr-10 lg:pl-10 lg:flex-row">
            <div className="bg-yellow-600 lg:w-[55%] w-full lg:h-[625px] h-[270px]"></div>
            <div className="w-full mt-6 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
              <div className="flex flex-col items-center justify-start lg:pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10 ">
                <p className="w-full text-4xl font-bold text-center font-serif">
                  Login
                </p>

                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                  {LoginControls.map((item) =>
                    item.componentType === "input" ? (
                      <InputComponent
                        type={item.type}
                        placeholder={item.placeholder}
                        label={item.label}
                        value={formData[item.id]}
                        onChange={(e) => {
                          setformData({
                            ...formData,
                            [item.id]: e.target.value,
                          });
                        }}
                      />
                    ) : null
                  )}
                  <button
                    disabled={!isValidForm()}
                    onClick={handleLogin}
                    className={`disabled:bg-gray-500 disabled:cursor-not-allowed mt-8 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide hover:bg-yellow-500 ${
                      componentsLoader && componentsLoader.loading
                        ? "bg-gray-500 cursor-not-allowed pointer-events-none hover:bg-gray-500"
                        : ""
                    }`}
                  >
                    {componentsLoader && componentsLoader.loading ? (
                      <Componentloader
                        text={"Logging"}
                        color={"#fff"}
                        loading={componentsLoader}
                      />
                    ) : (
                      "Login"
                    )}
                  </button>

                  <div className="flex flex-col gap-2 ">
                    <p>Don't Have any Account ?</p>
                    <p
                      className="mt-2 inline-flex w-full items-center justify-center bg-black px-6  cursor-pointer py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide hover:bg-yellow-500"
                      onClick={() => router.push("/register")}
                    >
                      Register
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Notification />
      </div>
    </>
  );
}

export default Login;
