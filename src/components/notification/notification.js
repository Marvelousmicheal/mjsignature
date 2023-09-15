"use client"

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"




function Notification() {
  return (
    <ToastContainer
    position="top-right"
    autoClose={400}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    pauseOnFocusLoss
    pauseOnHover
    draggable
    theme="light"
    rtl={false}
    />
  )
}

export default Notification