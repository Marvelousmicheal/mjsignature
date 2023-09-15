import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Product ID was not found",
      });
    }

    const deleteProduct = await Product.findByIdAndDelete(id);

    if (deleteProduct) {
      return NextResponse.json({
        success: true,
        message: "Products has been deleted",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "something went wrong while trying to delete",
      });
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "something went wrong!!!! please try again",
    });
  }
}
