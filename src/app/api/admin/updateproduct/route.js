import connectToDB from "@/database"
import Product from "@/models/product"
import { NextResponse } from "next/server"

 


 export const dynamic ="force-dynamic"

 export async function PUT(req){
    try {

        await connectToDB()
const extractData = await req.json()

const {
    _id,
    name,
    description,
    price,
    imageUrl,
    category,
    size,
    deliveryInfo,
    onSale,
    priceDrop,
} = extractData


const updateProduct = await Product.findByIdAndUpdate({
_id: _id
},{
    name,
    description,
    price,
    imageUrl,
    category,
    size,
    deliveryInfo,
    onSale,
    priceDrop, 
},{new:true})

if(updateProduct){
    return NextResponse.json({
        success: true,
        message: "Product has been updated"
    })
}else{
    return NextResponse.json({
        success:false,
        message:"something went wrong while trying to update"
    })
}



    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "something went wrong!!!! please try again"
        })
    }
 }