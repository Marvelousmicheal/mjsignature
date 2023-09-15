"use client";

import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export function GlobalContextProvider({ children }) {
  const [showNavModal, setNavModal] = useState(false);
  const [isAuthUser, setisAuthUser] = useState(null);
  const [componentsLoader, setcomponentsLoader]=useState({loading:false, id:""})
  const [pageLoader, setpageLoader]=useState(false)
  const [currentUpdateProduct, setCurrentUpdateProduct]= useState(null)


  const [user, setuser] = useState(null);


 



  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setisAuthUser(true);
      const userData = JSON.parse(localStorage.getItem("user")) || {};
    
      setuser(userData);
    } else {
      setisAuthUser(false);
      setuser({}); //unauthenticated user
    }
  }, [Cookies]);

  






  

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setNavModal,
        isAuthUser,
        setisAuthUser,
        user,
        setuser,
        componentsLoader,
        setcomponentsLoader,
        pageLoader, setpageLoader,
        currentUpdateProduct, setCurrentUpdateProduct
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
