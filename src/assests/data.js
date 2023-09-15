export const NavLinks = [
    {
        id: "home",
        name: "Home",
        path: "/"
    },
    {
        id: "listing",
        name: "All Products",
        path: "/product/listing/allproducts"

    },
    {
        id: "listingMen",
        name: "Men",
        path: "/product/listing/men"
    },
    {
        id: "listingWomen",
        name: "Women",
        path: "/product/listing/women"
    },
    {
        id: "listingKids",
        name: "Kid",
        path: "/product/listing/kids"
    },
];

export const adminNavLinks = [
    {
        id: "adminListing",
        name: "Manage Products",
        path: "/adminview/allproducts"
    },
    {
        id: "adminAddProduct",
        name: "Add new product",
        path: "/adminview/addproduct"
    },
];


export const styles={
    button:"mt-1.5 bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white hover:bg-gray-900"
}
export const registrationControls=[
    {
        id:"name",
        type:"text",
        placeholder:"Enter Your name",
        label:"Name",
        componentType:"input"
        
    },
    {
        id:"email",
        type:"text",
        placeholder:"Enter Your Email",
        label:"Email",
        componentType:"input"
        
    },
    {
        id:"password",
        type:"text",
        placeholder:"Enter Your Password",
        label:"Password",
        componentType:"input"
        
    },
    {
        id:"role",
        type:"",
        placeholder:"",
        label:"Role",
        componentType:"select",
        option:[
            {
                id:"customer",
                label:"Customer"
            },
            {
                id:"admin",
                label:"Admin"
            },
        ]
        
    },
]

export const LoginControls = [
    {
        id:"email",
        type:"text",
        placeholder:"Enter Your Email",
        label:"Email",
        componentType:"input"       
    },
    {
        id:"password",
        type:"text",
        placeholder:"Enter Your Password",
        label:"Password",
        componentType:"input"

    }
]
export const addProductControls = [
    {
        id:"name",
        type:"text",
        placeholder:"Enter Your Product Name",
        label:"Product Name",
        componentType:"input"       
    },
    {
        id:"description",
        type:"text",
        placeholder:"Enter description",
        label:"Description",
        componentType:"input"
    
    },
    {
        id:"category",
        type:"",
        placeholder:"",
        label:"categories",
        componentType:"select",
        option:[
            {
                id:"men",
                label:"Men"
            },
            {
                id:"women",
                label:"Women"
            },
            {
                id:"kids",
                label:"kids"
            },
        ]
        
    },
    {
        id:"deliveryInfo",
        type:"text",
        placeholder:"Enter delivery Info",
        label:"Delivery Info",
        componentType:"input"
    
    },
    {
        id:"price",
        type:"number",
        placeholder:"Enter price",
        label:"Price",
        componentType:"input"
    
    },
    {
        id:"onSale",
        type:"",
        placeholder:"",
        label:"On Sale",
        componentType:"select",
        option:[
            {
                id:"no",
                label:"No"
            },
            {
                id:"yes",
                label:"Yes"
            },
            
        ]
        
    },
    {
        id:"priceDrop",
        type:"number",
        placeholder:"Enter New price",
        label:"Discount Price",
        componentType:"input"
    
    }
]

export const availableControls=[
    {
        id:"s",
        label: "S"
    },
    {
        id:"m",
        label: "M"
    },
    {
        id:"l",
        label: "L"
    }
]


export const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  };
  

  export const firebaseURL = "gs://mimi-ecommerce.appspot.com"