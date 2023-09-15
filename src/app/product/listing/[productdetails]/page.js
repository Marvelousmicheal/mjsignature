import CommonDetail from "@/components/commonDetails/CommonDetail";
import { productById } from "@/service/product";



async function ProductDetails({ params }) {
  const productDetailsData = await productById(params.details);

  console.log(productDetailsData, "sangam");
return <CommonDetail item={productDetailsData && productDetailsData.data}/>
  
}

export default ProductDetails