// THis file is responsible for the ilustration of the 'product detailed view' portal

"use client"; // Mark this file as a client component

import ProductSummary from "@/components/ProductSummary/ProductSummary";
import SimilarProducts from "@/components/SimilarProducts/SimilarProducts";
import BackToCategoriesBar from "@/components/BackToCategoriesBar/BackToCategoriesBar";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function ProductDetailedView() {
  const router = useRouter();
  const productId = "TW41M0"; // Replace with dynamic ID if needed
  const category = "Technology"; // Replace with dynamic category if needed

  return (
    <div className = "flex">
      {/* Sidebar with default "Search" selected */}
      <Sidebar
        defaultSelected = "Search"
        onHomeClick={() => router.push("/finditallmain")} // Navigate to "finditallmain"
      />

      {/* Main Content */}
      <div className = "flex-1 p-6 sm:p-10">
        {/* Back to Categories Bar */}
        <BackToCategoriesBar category={category} />

        {/* Product Summary */}
        <ProductSummary productId={productId} />

        {/* Similar Products */}
        <SimilarProducts category={category} />
      </div>
    </div>
  );
}