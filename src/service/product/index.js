import Cookies from "js-cookie";

export const addNewProduct = async (formData) => {
  try {
    const response = await fetch("/api/admin/addproduct", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllAdminProducts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/admin/allproducts", {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const UpdateProduct = async (formData) => {
  try {
    const response = await fetch("/api/admin/updateproduct", {
      method: "PUT", 
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData), 
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`/api/admin/deleteproduct?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};



export const productcatergory = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/admin/productcatergory?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const data = await res.json();
   
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const productById = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/admin/productcatergory?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await res.json();
console.log(data)
    return data;
  } catch (e) {
    console.log(e);
  }
};