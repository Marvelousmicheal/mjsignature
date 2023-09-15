"use client";
import { registrationControls } from "@/assests/data";
import InputComponent from "@/components/Form/inputcomponents/InputComponents";
import SelectComponent from "@/components/Form/selectcomponents/selectcomponents";
import Componentloader from "@/components/loaders/componentloader/componentloader";
import Notification from "@/components/notification/notification";
import { GlobalContext } from "@/context/context";
import { registerNewUser } from "@/service/register";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const initialState = {
  name: "",
  email: "",
  password: "",
  role: "customer",
};

function Register() {
  const [formData, setformData] = useState(initialState);
  const [isRegistered, setisRegistered] = useState(false);
  const { componentsLoader, setcomponentsLoader,isAuthUser } = useContext(GlobalContext);
  const router = useRouter();

  function validFunction() {
    return formData &&
      formData.name &&
      formData.name.trim() !== "" &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
      

    }
  async function handleOnSubmit(e) {
    e.preventDefault();
    setcomponentsLoader({loading:true, id:""})
    const data = await registerNewUser(formData);
    if (data.success) {
      toast.success(data.message,{position: toast.POSITION.TOP_RIGHT})
      setisRegistered(true);
      setcomponentsLoader({loading:false, id:""})
     
      setformData(initialState);
    } else {
       toast.error(data.message,{position: toast.POSITION.TOP_RIGHT})
       setcomponentsLoader({loading:false, id:""})
      setformData(formData);
    }
  }
  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);
  return (
    <>
      <div className="bg-white relative h-screen">
        <div className="flex flex-col items-start justify-between pt-0 lg:pr-10 pb-0 lg:pl-10 px-4 mt-8 mr-auto  xl:px-5 lg:flex-row">
          <div className="flex flex-col justify-center items-center w-full gap-5 h-full lg:pr-10 lg:pl-10 lg:flex-row">
            <div className="bg-yellow-600 lg:w-[55%] w-full lg:h-[625px] h-[270px]"></div>
            <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
              <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10 ">
                <p className="w-full text-4xl font-bold text-center font-serif">
                  {isRegistered
                    ? "Registeration Successful"
                    : "Sign up to Buy from Us"}
                </p>

                {isRegistered ? (
                  <button
                    onClick={() => router.push("/login")}
                    className="mt-8 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                  >
                    Login
                  </button>
                ) : (
                  <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                    {registrationControls.map((item) =>
                      item.componentType === "input" ? (
                        <InputComponent
                          type={item.type}
                          placeholder={item.placeholder}
                          label={item.label}
                          onChange={(e) => {
                            setformData({
                              ...formData,
                              [item.id]: e.target.value,
                            });
                          }}
                          value={formData[item.id]}
                        />
                      ) : item.componentType === "select" ? (
                        <SelectComponent
                          options={item.option}
                          label={item.label}
                          onChange={(e) => {
                            setformData({
                              ...formData,
                              [item.id]: e.target.value,
                            });
                          }}
                          value={formData[item.id]}
                        />
                      ) : null
                    )}
                    <button
                      disabled={!validFunction()}
                      onClick={handleOnSubmit}
                      className={`disabled:bg-gray-500 disabled:cursor-not-allowed mt-8 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide hover:bg-yellow-500 ${componentsLoader && componentsLoader.loading ?"bg-gray-500 cursor-not-allowed pointer-events-none hover:bg-gray-500":""}`}
                    >
                     {
                     componentsLoader && componentsLoader.loading  ? (<Componentloader text={"Registering"} color={"#fff"} loading={componentsLoader}/>): ("Register")
                     }
                    </button>
                    <button className="disabled:bg-gray-500 disabled:cursor-not-allowed mt-8 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide hover:bg-yellow-500">
                      contiune with google
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Notification />
      </div>
    </>
  );
}

export default Register;
