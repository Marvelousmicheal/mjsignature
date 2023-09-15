import connectToDB from "@/database";
import Product from "@/models/product";
import Joi from "joi";
import { NextResponse } from "next/server";


const AddNewProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  size: Joi.array().required(),
  deliveryInfo: Joi.string().required(),
  onSale: Joi.string().required(),
  priceDrop: Joi.number().required(),
  imageUrl: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();

   
const user = "Admin"


    if (user === "Admin") {
      const extractData = await req.json();

      const {
        name,
        description,
        price,
        imageUrl,
        category,
        size,
        deliveryInfo,
        onSale,
        priceDrop,
      } = extractData;

      const { error } = AddNewProductSchema.validate({
        name,
        description,
        price,
        imageUrl,
        category,
        size,
        deliveryInfo,
        onSale,
        priceDrop,
      });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newlyCreatedProduct = await Product.create(extractData);

      if (newlyCreatedProduct) {
        return NextResponse.json({
          success: true,
          message: "Product added successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to add the product ! please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not autorized !",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}

// const {
//   name,
//   description,
//   catergory,
//   deliveryInfor,
//   price,
//   onSale,
//   priceDrop,
//   size,
//   imageUrl,
// } = extractData;

// const error = addNewProductSchema.validate({
//   name,
//   description,
//   catergory,
//   deliveryInfor,
//   price,
//   onSale,
//   priceDrop,
//   size,
//   imageUrl,
// })