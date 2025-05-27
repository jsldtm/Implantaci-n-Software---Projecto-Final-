// THis file is responsible for the illustration of the 'product detailed view' portal

"use client";
import SimilarProducts from "@/components/SimilarProducts/SimilarProducts";
import BackToCategoriesBar from "@/components/BackToCategoriesBar/BackToCategoriesBar";
import FloatingCartElement from "../../components/FloatingCartElement/FloatingCartElement";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function ProductDetailedView() {
  // --- CORE FUNCTIONALITY: Dynamic Product Detailed View ---
  // 1. Get the search parameters from the URL (productId, category)
  //    This enables deep linking and dynamic rendering of any product.
  const searchParams = useSearchParams();
  const productId = searchParams ? searchParams.get("productId") : null;
  const category = searchParams ? searchParams.get("category") : null;

  // 2. Utility: Check if a product is already saved (for wishlist/favorites)
  //    This uses localStorage and only runs on the client.
  function isProductSaved(id: string) {
    if (typeof window === "undefined") return false;
    const key = "savedProducts";
    const existing = localStorage.getItem(key);
    if (!existing) return false;
    try {
      const savedArr = JSON.parse(existing);
      return savedArr.some((p: any) => p.id === id);
    } catch {
      return false;
    }
  }

  // 3. Simulate fetching product data based on productId
  //    (In a real app, this would be a fetch to an API or database.)
  //    Here, you would look up the product in a local object or array.
  //    Example: const product = productDetails[productId];

  // 4. Render the product details, sidebar, floating cart, and similar products
  //    - Sidebar: Persistent navigation
  //    - FloatingCartElement: Quick access to cart
  //    - BackToCategoriesBar: Easy navigation back to category
  //    - ProductSummary: Shows all product info (not shown here, but would be rendered)
  //    - SimilarProducts: Shows related items for cross-selling

  // 5. If product not found, render a 'Product Not Found' message
  //    (This is a good UX practice for invalid URLs or missing data.)

  // --- END OF CORE FUNCTIONALITY ---

  // Convert productId to a number and handle invalid cases
  const numericProductId = productId ? parseInt(productId, 10) : null;
  const product = numericProductId ? productDetails[numericProductId] : null;
  
  if (!product) {
    return (
      <div className  = "bg-white rounded-lg shadow-md p-6">
        <h1 className  = "text-2xl font-bold mt-4">Product Not Found</h1>
        <p className  = "text-sm text-gray-500 mt-4">
          This is not the product you are looking for...
        </p>
      </div>
    );
  }

  console.log(product); // Debugging: Check the product object

  return (
    <div style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)", minHeight: "100vh" }} className  = "flex min-h-screen">
      <Sidebar portalName  = "productdetailedview" />
      <div className  = "flex-1 p-4 sm:p-10">
        <FloatingCartElement />
        <BackToCategoriesBar category = {category || "Unknown"} />
        <ProductSummary product = {product} isSaved={isProductSaved(productId || "")} />
        <SimilarProducts category = {category || "Unknown"} />
      </div>
    </div>
  );
}