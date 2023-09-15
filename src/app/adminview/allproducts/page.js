

import Listing from "@/components/ListingComponent/Listing"
import { getAllAdminProducts } from "@/service/product";



async function adminViewProduct() {
  const allProduct = await getAllAdminProducts()

  
  return (
   
  
   <Listing data={allProduct && allProduct.data}/>
     
  )
}

export default adminViewProduct