// This file is a client component because it uses the `useRouter` hook from Next.js.

"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import Head from "next/head";
import ProductsListedByCategory from "@/components/ProductsListedByCategory/ProductsListedByCategory";
import CategoryBar from "@/components/CategoryBar/CategoryBar";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const CategoriesPage: React.FC = () => {
    const router = useRouter(); // Initialize the router
    
    // Data simulation
    const categories = [
        { id: 1, name: "Office & writing" },
        { id: 2, name: "Technology" },
        { id: 3, name: "Accessories" },
        { id: 4, name: "Shirts" },
        { id: 5, name: "Household" },
        { id: 6, name: "Movies & TV" },
        { id: 7, name: "Pet supplies" },
        { id: 8, name: "Sports" },
        { id: 9, name: "Books" },

    ];

    const productsByCategory: Record<string, { id: number; name: string; price: number; image: string; preOrder?: boolean }[]> = {
        
        Technology: [
            { id: 1, name: "Cable USB-B", price: 109.99, image: "/images/usb-cable.png" },
            { id: 2, name: "Wireless Desk Charging", price: 149.99, image: "/images/wireless-charger.png" },
            { id: 3, name: "Smartwatch Samsung Galaxy Fit 3", price: 229.99, image: "/images/smartwatch.png" },
            { id: 4, name: "Vintage Bluetooth Retro Vinyl Turntable", price: 2999.49, image: "/images/turntable.png" },
            { id: 5, name: "Nokia 2660 Flip Phone Zero Distractions", price: 639.19, image: "/images/nokia-phone.png" },
            { id: 6, name: "Galaxy *Ring of Power*", price: 4209.99, image: "/images/galaxy-ring.png", preOrder: true },
            { id: 7, name: "Waymo ride Gift Card!", price: 399.99, image: "/images/waymo.png" },
            { id: 8, name: "Rechargeable Clip-On Desk Fan", price: 239.99, image: "/images/desk-fan.png" },
            { id: 9, name: "Monitor PC Lanix LX215 21.5 Pulg", price: 189.99, image: "/images/monitor.png" },
            { id: 10, name: "Samsung Galaxy Book3 Pro Intel Core i7", price: 2499.99, image: "/images/galaxy-book.png" },
            { id: 11, name: "Google Home Mini 2nd Generation-Chalk", price: 1449.99, image: "/images/google-home.png" },
            { id: 12, name: "Sony WH-1000XM4 Wired Over-Ear Noise-Cancelling", price: 109.99, image: "/images/sony-headphones.png" },
            { id: 13, name: "Custom Bluetooth Mouse", price: 329.99, image: "/images/mouse.png" },
            { id: 14, name: "Digital Pen - Bluetooth Technology", price: 1249.99, image: "/images/magic-pen.png" },
            { id: 15, name: "Portable and Compact Wireless Keyboard", price: 749.99, image: "/images/wireless-keyboard-pink.png" },
                                    
        ],

        Accessories: [
            { id: 8, name: "Rechargeable Clip-On Desk Fan", price: 239.99, image: "/images/desk-fan.png" },
            { id: 13, name: "Custom Bluetooth Mouse", price: 329.99, image: "/images/mouse.png" },
            { id: 19, name: "Portable and Compact Wireless Keyboard", price: 749.99, image: "/images/wireless-keyboard-pink.png" },
            { id: 15, name: "Portable and Compact Wireless Keyboard", price: 749.99, image: "/images/wireless-keyboard-pink.png" },
            { id: 16, name: "To be continued...", price: 3.1415, image: "/images/lamp.png" },
            
                    
        ],

        "Office & writing": [
            { id: 21, name: "Paper Over Board Ring Binder", price: 59.99, image: "/images/pinkbinder.png" },
        
        ],

        Shirts: [
            { id: 22, name: "Spring & Summer", price: 29.99, image: "/images/spring-shirt.jpg" },
        
        ],

        Household: [
            { id: 23, name: "Household Item 1", price: 49.99, image: "/images/household-item.jpg" },
        ],
    
    };

    const [chosenCategory, setChosenCategory] = React.useState("Technology");

    return (
        <>
            {/* Dynamically set the title and meta tags */}
            <Head>
                <title>Findit All - Our Categories</title>
                <meta name="description" content="Explore our categories and find the best products for you." />
            </Head>

            <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
                <aside className="w-20 bg-gray-900 text-white flex flex-col items-center py-4 space-y-6">
                <button
                        className="hover:text-blue-500"
                        onClick={() => router.push("/finditallmain")} // Navigate to 'finditallmain'
                    >
                        <HomeIcon fontSize = "large" />
                    </button>
                    <button className = "hover:text-blue-500">
                        <SearchIcon fontSize = "large" />
                    </button>
                    <button className = "hover:text-blue-500">
                        <BookmarkIcon fontSize = "large" />
                    </button>
                    <button className = "hover:text-blue-500">
                        <SettingsIcon fontSize = "large" />
                    </button>
                </aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <header className="bg-blue-500 text-white p-4 flex items-center justify-between">
                        <h1 className="text-xl font-bold">Our Categories</h1>
                        <div className="flex items-center space-x-4">
                            <button>
                                <NotificationsIcon fontSize="large" />
                            </button>
                            <button>
                                <AccountCircleIcon fontSize="large" />
                            </button>
                        </div>
                    </header>

                    {/* Category Tabs */}
                    <nav className="bg-blue-100 p-2 flex space-x-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={`px-4 py-2 rounded ${
                                    chosenCategory === category.name
                                        ? "bg-blue-500 text-white"
                                        : "bg-white text-blue-500"
                                }`}
                                onClick={() => setChosenCategory(category.name)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </nav>

                    {/* Product Grid */}
                    <main className="flex-1 p-4 overflow-y-auto">
                        <ProductsListedByCategory
                            category={chosenCategory}
                            products={productsByCategory[chosenCategory] || []}
                        />
                    </main>
                </div>
            </div>
        </>
    );
};

export default CategoriesPage;