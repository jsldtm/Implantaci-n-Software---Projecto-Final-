import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const ProductCategoryList: React.FC = () => {
  const categories = [
    { id: 1, name: "Office & writing", image: "/images/office.png" },
    { id: 2, name: "Technology", image: "/images/technology.png" },
    { id: 3, name: "Accessories", image: "/images/accessories.png" },
    { id: 4, name: "Shirts", image: "/images/shirts.png" },
    { id: 5, name: "Household", image: "/images/household.png" },
    { id: 6, name: "Movies & TV", image: "/images/movies.png" },
    { id: 7, name: "Pet supplies", image: "/images/pets.png" },
    { id: 8, name: "Sports", image: "/images/sports.png" },
    { id: 9, name: "Books", image: "/images/books.png" },
  
];

  return (
    <div className = "relative">
      <div className = "overflow-x-auto no-scrollbar">
        <div className = "flex space-x-6 px-4">
          {categories.map((category) => (
            <div key={category.id} className = "flex-shrink-0 text-center">
              <img
                src = {category.image}
                alt = {category.name}
                className = "w-16 h-16 rounded-full object-cover border border-gray-300"
              />
              <p className = "text-gray-800 text-sm mt-2">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Fading effect to indicate scrollability */}
      <div className = "absolute top-0 left-0 h-full w-6 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
      <div className = "absolute top-0 right-0 h-full w-6 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
    </div>
  );
};

export default ProductCategoryList;