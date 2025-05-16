// THis file is responsible for the ilustration of the 'product detailed view' portal

"use client";

import ProductSummary from "@/components/ProductSummary/ProductSummary";
import SimilarProducts from "@/components/SimilarProducts/SimilarProducts";
import BackToCategoriesBar from "@/components/BackToCategoriesBar/BackToCategoriesBar";
import FloatingCartElement from "../../components/FloatingCartElement/FloatingCartElement";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function ProductDetailedView() {
    const searchParams = useSearchParams() as unknown as URLSearchParams;
    const productId = searchParams.get("productId");
    const category = searchParams.get("category");

  // Simulate fetching product data based on productId
  const productDetails = {
    7: {
      id: 7,
      name: "Waymo Ride Gift Card",
      description:
        "Unlock the future of transportation with a Waymo Rides gift card!" +
        "\nImagine gifting the freedom of safe, convenient, and autonomous rides to your loved ones." +
        " Whether it's for daily commutes, exploring the city, or getting to appointments - a Waymo gift card offers a unique and forward-thinking way to travel." +
        "\nMake your gift truly personal by choosing the exact amount you want to load onto the Waymo Rides gift card. Simply enter your desired value in the field below." +
        "\nWaymo vehicles are framed & designed with passenger comfort and safety in mind!",
      startingPrice: "$399.99 MXN",
      prices: ["$399.99 MXN", "$599.99 MXN", "$799.99 MXN"],
      image: "/images/gowaymogo.png",
      category: "Technology",
    },
    1: {
      id: 1,
      name: "Cable USB-B",
      description: "A reliable USB-B cable for all your connectivity needs.",
      price: 109.99,
      image: "/images/usb-cable.png",
      category: "Technology",
    },
    // Add other products here...
  };

  // Convert productId to a number and handle invalid cases
  const numericProductId = productId ? parseInt(productId, 10) : null;
  const product = numericProductId ? productDetails[numericProductId] : null;
  
  if (!product) {
    return (
      <div className = "bg-white rounded-lg shadow-md p-6">
        <h1 className = "text-2xl font-bold mt-4">Product Not Found</h1>
        <p className = "text-sm text-gray-500 mt-4">
          This is not the product you are looking for...
        </p>
      </div>
    );
  }

  console.log(product); // Debugging: Check the product object

  return (
    <div className = "flex min-h-screen">
      <Sidebar portalName = "productdetailedview" />
      <div className = "flex-1 p-4 sm:p-10">
        <FloatingCartElement />
        <BackToCategoriesBar category = {category || "Unknown"} />
        <ProductSummary product = {product} />
        <SimilarProducts category = {category || "Unknown"} />
      </div>
    </div>
  );
}