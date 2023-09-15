"use client";

import {
  addProductControls,
  availableControls,
  firebaseConfig,
  firebaseURL,
} from "@/assests/data";
import Imagecomponents from "@/components/Form/imagecomponents/imagecomponents";
import InputComponent from "@/components/Form/inputcomponents/InputComponents";
import SelectComponent from "@/components/Form/selectcomponents/selectcomponents";
import Componentloader from "@/components/loaders/componentloader/componentloader";
import Tilecomponent from "@/components/titlecomponent/titlecomponent";
import { GlobalContext } from "@/context/context";

import { FaCloudUploadAlt } from "react-icons/fa";

import { AiFillFileImage } from "react-icons/ai";
import { AiTwotoneDelete } from "react-icons/ai";

import { useContext, useEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { UpdateProduct, addNewProduct } from "@/service/product";
import { toast } from "react-toastify";
import Notification from "@/components/notification/notification";
import { useRouter } from "next/navigation";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseURL);

function adminAddProduct() {
  const fileInputRef = useRef(null);
  const [image, setimage] = useState(null);
  const [filename, setfilename] = useState(null);
  const { componentsLoader, setcomponentsLoader,currentUpdateProduct, setCurrentUpdateProduct } = useContext(GlobalContext);
  const initialformData = {
    name: "",
    description: "",
    category: "women",
    deliveryInfo: "",
    price: 0,
    onSale: "no",
    priceDrop: 0,
    size: [],
    imageUrl: "",
  };
  const [formData, setformData] = useState(initialformData);
  const router = useRouter()

console.log(currentUpdateProduct);


  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const createUniqueFileName = (getfile) => {
    const timestamps = Date.now();
    const randomStringValue = Math.random().toString(36).substring(2, 12);

    return `${getfile.name}-${timestamps}-${randomStringValue}`;
  };
  async function helperForUPloadingImageToFirebase(file) {
    const getfileName = createUniqueFileName(file);
    const storageReference = ref(storage, `ecommerce/${getfileName}`);
    const upLoadImage = uploadBytesResumable(storageReference, file);

    return new Promise((resolve, reject) => {
      upLoadImage.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(upLoadImage.snapshot.ref)
            .then((downloadURL) => resolve(downloadURL))
            .catch((error) => reject(error));
        }
      );
    });
  }
  const handleImage = async ({ target: { files } }) => {
    files[0] && setfilename(files[0].name);

    if (files) {
      setimage(URL.createObjectURL(files[0]));

      const extractImageUrl = await helperForUPloadingImageToFirebase(files[0]);
      if (extractImageUrl !== "") {
        setformData({
          ...formData,
          imageUrl: extractImageUrl,
        });
      }
    }
  };


  function handleTileClick(getselecteditem) {
    let sizeCopy = [...formData.size];
    const index = sizeCopy.findIndex((item) => item.id === getselecteditem.id);

    if (index === -1) {
      sizeCopy.push(getselecteditem);
    } else {
      sizeCopy = sizeCopy.filter((item) => item.id !== getselecteditem.id);
    }
    setformData({
      ...formData,
      size: sizeCopy,
    });
  }

  

async function handleSubmit(e){

  e.preventDefault()
   setcomponentsLoader({ loading: true, id: "" })
   const res = currentUpdateProduct !== null ? await UpdateProduct(formData) : await addNewProduct(formData)

 if(res.success){
  setcomponentsLoader({loading: false, id:""})
  toast.success(res.message, {
    position: toast.POSITION.TOP_RIGHT
  })
  setformData(initialformData)
  setCurrentUpdateProduct(null)
setTimeout(() => {
  router.push("/adminview/allproducts")
}, 1000);
 }else{
  toast.error(res.message,{
    position: toast.POSITION.TOP_RIGHT
  })
  setcomponentsLoader({loading: false, id:""})

 }
}

useEffect(()=>{
  if(currentUpdateProduct !== null){
    setformData(currentUpdateProduct)
  }
},[currentUpdateProduct])


  return (
    <>
      <div className="mt-12 w-full px-12  ">
        <h1 className="capitalize text-center font-semibold text-4xl">
          update and add product
        </h1>

        <main className="w-full flex">
          <div className=" w-[40%] ">
            <>
              <div
                onClick={handleDivClick}
                className=" input-field flex flex-col justify-center items-center rounded cursor-pointer mt-12 border border-dashed border-yellow-500 h-[300px] w-[500px]"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/"
                  className=" input-field "
                  hidden
                  onChange={handleImage}
                />
                {image ? (
                  <img src={image} className="w-full" />
                ) : (
                  <FaCloudUploadAlt color="black" size={60} />
                )}
              </div>

              <div className="flex mt-3 items-center justify-center">
                {filename ? (
                  <>
                    <AiFillFileImage color="black" />
                    <span className="mx-8 ">{filename}</span>

                    <AiTwotoneDelete
                      onClick={() => {
                        setfilename(false);
                        setimage(null);
                      }}
                      className="cursor-pointer"
                    />
                  </>
                ) : null}
              </div>
              <h1 className="font-bold text-lg mt-3 flex items-center justify-center">
                {" "}
                <FaCloudUploadAlt color="black" size={30} className="mr-4" />
                upload image of product
              </h1>
            </>
          </div>
          <div className=" w-[60%] space-y-6 mt-8">
            {addProductControls.map((item) =>
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
              ) : item.componentType === "select" ? (
                <SelectComponent
                  options={item.option}
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
            <div>
              <h5>Available Sizes</h5>
              <Tilecomponent
                selected={formData.size}
                data={availableControls}
                onClick={handleTileClick}
              />
            </div>
            <button
              onClick={handleSubmit}
              className={`disabled:bg-gray-500 disabled:cursor-not-allowed mt-8 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide hover:bg-yellow-500 ${
                componentsLoader && componentsLoader.loading
                  ? "bg-gray-500 cursor-not-allowed  pointer-events-none hover:bg-gray-500"
                  : ""
              }`}
            >
              {componentsLoader && componentsLoader.loading ? (
                <Componentloader
                  text={currentUpdateProduct !== null ?"Updating Product":"Adding Product"}
                  color={"#fff"}
                  loading={componentsLoader}
                />
              ) : (
                currentUpdateProduct !== null ? "Update Product" :
                "Add Product"
              )}
            </button>
          </div>
        <Notification/>
        </main>
      </div>
    </>
  );
}

export default adminAddProduct;
