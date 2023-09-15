import Listing from '@/components/ListingComponent/Listing'
import { productcatergory } from '@/service/product'


async function WomenCatergory() {
    const AllClientProducts = await productcatergory("Women")
  return (
    <>
    <Listing data={AllClientProducts && AllClientProducts.data}/>
    </>
  )
}

export default WomenCatergory