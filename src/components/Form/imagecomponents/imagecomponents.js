"use client";

import { useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

import { AiFillFileImage } from "react-icons/ai";
import { AiTwotoneDelete } from "react-icons/ai";

import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firebaseConfig, firebaseURL } from "@/assests/data";
import { resolve } from "styled-jsx/css";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseURL);

function Imagecomponents() {
  const fileInputRef = useRef(null);
  const [image, setimage] = useState(null);
  const [filename, setfilename] = useState(null);

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
    }
  };
  return (
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
  );
}

export default Imagecomponents;
