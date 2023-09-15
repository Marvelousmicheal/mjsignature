
import Listing from '@/components/ListingComponent/Listing'
import { getAllAdminProducts } from '@/service/product'


async function AllProductClient() {
    const AllAdminProducts = await getAllAdminProducts()
  return (
   <>
   <Listing data={AllAdminProducts && AllAdminProducts.data}/>
   </>
  )
}

export default AllProductClient