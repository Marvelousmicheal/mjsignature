import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";


export async function GET(req){
    try {
        await connectToDB()
        const user = "Admin"
   
        if(user === "Admin" ){
   const extractProducts = await Product.find({})

   if(extractProducts){
    return NextResponse.json({
        success:true,
        data: extractProducts
    })
}else{
       return NextResponse.json({
           success:false,
           status: 505,
           message:"No Product found"
       })

   }
        }else{
           return NextResponse.json({
               success:false,
               message : "You are not authorized"
           })
        }
    } catch (error) {
console.log(error)
return NextResponse.json({
    success: false,
    message:"something went wrong!!!! try again"
})        
    }
}