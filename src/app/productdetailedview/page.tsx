// THis file is responsible for the ilustration of the 'product detailed view' portal

import ProductSummary from "@/components/ProductSummary/ProductSummary";
import SimilarProducts from "@/components/SimilarProducts/SimilarProducts";
import BackToCategoriesBar from "@/components/BackToCategoriesBar/BackToCategoriesBar";

export default function ProductDetailedView() {
  const productId = "TW41M0"; // Replace with dynamic ID if needed
  const category = "Technology"; // Replace with dynamic category if needed

  return (
    <div className="p-6 sm:p-10">
      {/* Back to Categories Bar */}
      <BackToCategoriesBar category = {category} />

      {/* Product Summary */}
      <ProductSummary productId = {productId} />

      {/* Similar Products */}
      <SimilarProducts category = {category} />
    </div>
  );
}