"use client";

import Componentloader from "@/components/loaders/componentloader/componentloader";
import { GlobalContext } from "@/context/context";
import { deleteProduct } from "@/service/product";
import { usePathname, useRouter } from "next/navigation";

import { useContext } from "react";
import { toast } from "react-toastify";

function ProductButton({ item }) {
  const pathName = usePathname();
  const { setCurrentUpdateProduct, componentsLoader, setcomponentsLoader } =
    useContext(GlobalContext);
  const router = useRouter();
  const isAdminView = pathName.includes("adminview");

  const handleButtonClick = () => {
    setCurrentUpdateProduct(item);
    router.push("/adminview/addproduct"); 
  };

  async function handleDeleteProduct(item) {
    console.log("clicked")
    const res = await deleteProduct(item._id);
  
    if (res.success) {
      setcomponentsLoader({ loading: true, id: item._id });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.refresh();
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setcomponentsLoader({ loading: false, id: item._id });
    }
  }

  return (
    <>
      {isAdminView ? (
        <>
          <button
            onClick={handleButtonClick}
            className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
          >
            Update
          </button>{" "}
          <button
            onClick={() => handleDeleteProduct(item)}
            className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
          >
            {componentsLoader &&
            componentsLoader.loading &&
            item._id === componentsLoader.id ? (
              <Componentloader
                text={"Deleting Product"}
                color={"#fff"}
                loading={componentsLoader}
              />
            ) : (
              "Delete"
            )}
          </button>
        </>
      ) : (
        <button className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
          Add to Cart
        </button>
      )}
    </>
  );
}

export default ProductButton;
