// THis file is responsible for the ilustration of the 'product detailed view' portal

"use client"; // Mark this file as a client component

import ProductSummary from "@/components/ProductSummary/ProductSummary";
import SimilarProducts from "@/components/SimilarProducts/SimilarProducts";
import BackToCategoriesBar from "@/components/BackToCategoriesBar/BackToCategoriesBar";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function ProductDetailedView() {
  const searchParams = useSearchParams(); // Access query parameters
  const productId = searchParams.get("productId"); // Get the productId from the URL
  const category = searchParams.get("category"); // Get the category from the URL

  return (
    <div className = "flex">
      {/* Sidebar with default "Search" selected */}
      <Sidebar portalName = "productdetailedview" />

      {/* Main Content */}
      <div className="flex-1 p-6 sm:p-10">
        {/* Back to Categories Bar */}
        <BackToCategoriesBar category={category || "Unknown"} />

        {/* Product Summary */}
        <ProductSummary productId={productId || "Unknown"} />

        {/* Similar Products */}
        <SimilarProducts category={category || "Unknown"} />
      </div>
    </div>
  );
}