

import Listing from '@/components/ListingComponent/Listing'
import { productcatergory } from '@/service/product'


async function kidsCatergory() {
    const AllClientProducts = await productcatergory("kids")
  return (
    <>
    <Listing data={AllClientProducts && AllClientProducts.data}/>
    </>
  )
}

export default kidsCatergory