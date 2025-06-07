// Código por - Joaquín Saldarriaga
import React from "react";

interface CategoryBarProps {
    categories: { id: number; name: string }[];
    onChosenCategory: (category: string) => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ categories, onChosenCategory }) => {
    return (
        <aside className  = "w-64 bg-gray-200 h-full p-4 shadow-md">
            <h2 className  = "text-xl font-semibold mb-4 text-gray-800">Categories</h2>
            <ul>
                {categories.map((category) => (
                    <li key = {category.id} className  = "mb-2">
                        <button
                            className  = "block hover:bg-gray-300 p-2 w-full text-left rounded-md text-gray-700 font-medium"
                            onClick = {() => onChosenCategory(category.name)}
                        >
                            {category.name}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default CategoryBar;