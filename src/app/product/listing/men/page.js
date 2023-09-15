


import Listing from '@/components/ListingComponent/Listing'
import { productcatergory } from '@/service/product'


async function MenCatergory() {
    const AllClientProducts = await productcatergory("men")
  return (
    <>
    <Listing data={AllClientProducts && AllClientProducts.data}/>
    </>
  )
}

export default MenCatergory