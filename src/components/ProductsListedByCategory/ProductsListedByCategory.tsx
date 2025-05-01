import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  preOrder?: boolean;
}

interface Props {
  category: string;
  products: Product[];
}

const ProductsListedByCategory: React.FC<Props> = ({ category, products }) => {
  return (
    <div className = "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div
        key={product.id}
        className = "bg-white rounded-lg shadow-md p-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
       >
          <img
            src = {product.image}
            alt = {product.name}
            className = "h-40 w-full object-cover rounded-md"
          />
          <h3 className = "text-md font-semibold mt-2 text-gray-800">{product.name}</h3>
          <p className = "text-sm text-gray-600">
            {product.name === "Waymo ride Gift Card!"
              ? `Starting at $${product.price.toFixed(2)} MXN`
              : `$${product.price.toFixed(2)} MXN`}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductsListedByCategory;