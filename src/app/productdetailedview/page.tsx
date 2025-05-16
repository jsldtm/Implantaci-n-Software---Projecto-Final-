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
    1: {
      id: 1,
      name: "Cable USB-B",
      description:
        "Experience seamless connectivity with our premium Cable USB-B!\n" +
        "Perfect for printers, audio interfaces, and countless other devices, this cable ensures your data transfers are fast and reliable every time.\n" +
        "Built to last, its flexible yet durable design stands up to daily use—whether at home, in the office, or on the go.\n" +
        "Say goodbye to tangled cords and connection issues, and enjoy peace of mind knowing your devices are always ready to perform.\n" +
        "Upgrade your tech setup with a cable trusted by professionals and enthusiasts alike!",
      price: "$109.99 MXN",
      image: "/images/usb-cable.png",
      category: "Technology",
    },

    2: {
      id: 2,
      name: "Wireless Desk Charging",
      description:
        "Cut the cord and embrace the future with our Wireless Desk Charging station!\n" +
        "Effortlessly power up your Qi-enabled devices—just place them on the pad and watch the magic happen, no cables required.\n" +
        "Its sleek, minimalist design fits perfectly on any desk or nightstand, keeping your workspace organized and clutter-free.\n" +
        "Engineered for safety, it protects your devices from overheating and overcharging, so you can charge with confidence.\n" +
        "Stay powered, stay productive, and enjoy the convenience of wireless charging every day.",
      price: "149.99",
      image: "/images/wireless-charger.png",
      category: "Technology",
    },
    3: {
      id: 3,
      name: "Smartwatch Samsung Galaxy Fit 3",
      description:
        "Take charge of your health and stay connected with the Samsung Galaxy Fit 3 Smartwatch!\n" +
        "Track your heart rate, monitor your sleep, and count every step with precision—all from your wrist.\n" +
        "Receive notifications, control your music, and keep up with your busy life without missing a beat.\n" +
        "Designed for comfort and style, it’s lightweight, water-resistant, and ready for any adventure.\n" +
        "Empower your fitness journey and enjoy smart features that make every day easier and more inspiring.",
      price: "229.99",
      image: "/images/smartwatch.png",
      category: "Technology",
    },
    4: {
      id: 4,
      name: "Vintage Bluetooth Retro Vinyl Turntable",
      description:
        "Rediscover the magic of vinyl with our Vintage Bluetooth Retro Vinyl Turntable!\n" +
        "Enjoy the warm, authentic sound of your favorite records, or stream music wirelessly from your phone with built-in Bluetooth.\n" +
        "Classic retro design meets modern technology, featuring integrated speakers and easy-to-use controls.\n" +
        "Perfect for music lovers, collectors, and anyone who appreciates timeless style and rich audio.\n" +
        "Bring nostalgia and innovation together—make every listening session an experience to remember.",
      price: "2999.49",
      image: "/images/turntable.png",
      category: "Technology",
    },
    5: {
      id: 5,
      name: "Nokia 2660 Flip Phone Zero Distractions",
      description:
        "Step back to simplicity with the Nokia 2660 Flip Phone—designed for those who value connection without distraction!\n" +
        "Enjoy crystal-clear calls, long battery life, and a classic flip design that fits comfortably in your hand or pocket.\n" +
        "Perfect for staying in touch with loved ones, focusing on what matters, and escaping the noise of modern smartphones.\n" +
        "Reliable, durable, and refreshingly easy to use, it’s the ideal choice for minimalists and anyone seeking a digital detox.\n" +
        "Rediscover the joy of communication—pure, simple, and distraction-free.",
      price: "639.19",
      image: "/images/nokia-phone.png",
      category: "Technology",
    },
    
    6: {
      id: 6,
      name: "Galaxy *Ring of Power*",
      description:
        "Pre-order the revolutionary Galaxy Ring of Power and wear the future on your finger!\n" +
        "This stylish smart ring offers advanced health tracking, smart notifications, and seamless connectivity—all in a sleek, comfortable design.\n" +
        "Monitor your heart rate, sleep, and activity discreetly, while staying connected to calls, messages, and reminders.\n" +
        "Crafted for elegance and engineered for performance, it's perfect for tech enthusiasts and trendsetters alike.\n" +
        "Be among the first to experience the next evolution in wearable technology—reserve your Galaxy Ring of Power today!",
      price: "4209.99",
      image: "/images/galaxy-ring.png",
      category: "Technology",
      preOrder: true,
    },
    
    7: {
      id: 7,
      name: "Waymo Ride Gift Card!",
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
    
    8: {
      id: 8,
      name: "Rechargeable Clip-On Desk Fan",
      description:
        "Beat the heat wherever you are with our Rechargeable Clip-On Desk Fan!\n" +
        "Designed for ultimate portability, this fan clips easily to your desk, bed, or any surface, delivering a refreshing breeze exactly where you need it.\n" +
        "Enjoy adjustable speed settings and whisper-quiet operation, making it perfect for work, study, or relaxation.\n" +
        "The built-in rechargeable battery ensures hours of cooling comfort, while the compact design fits seamlessly into any space.\n" +
        "Stay cool, comfortable, and productive—no matter the season or setting.",
      price: "239.99",
      image: "/images/desk-fan.png",
      category: "Technology",
    },

    9: {
      id: 9,
      name: "Monitor PC Lanix LX215 21.5 Pulg",
      description:
        "Transform your workspace with the Lanix LX215 21.5-inch Monitor!\n" +
        "Enjoy crisp, vibrant visuals whether you're working, studying, or streaming your favorite content.\n" +
        "The slim bezel and modern design make it a stylish addition to any desk, while the full HD resolution ensures every detail pops.\n" +
        "Easy to set up and compatible with a wide range of devices, this monitor is perfect for boosting productivity and entertainment alike.\n" +
        "Upgrade your view and experience clarity like never before.",
      price: "189.99",
      image: "/images/monitor.png",
      category: "Technology",
    },

    10: {
      id: 10,
      name: "Samsung Galaxy Book3 Pro Intel Core i7",
      description:
        "Unleash your productivity with the Samsung Galaxy Book3 Pro, powered by an Intel Core i7 processor!\n" +
        "This ultra-slim laptop combines powerful performance with a stunning display, making it ideal for professionals, students, and creators on the go.\n" +
        "Enjoy lightning-fast multitasking, immersive visuals, and all-day battery life in a sleek, portable package.\n" +
        "Whether you're editing, streaming, or working remotely, the Galaxy Book3 Pro keeps you ahead of the curve.\n" +
        "Experience the perfect blend of style, speed, and versatility—wherever your day takes you.",
      price: "2499.99",
      image: "/images/galaxy-book.png",
      category: "Technology",
    },
    11: {
      id: 11,
      name: "Google Home Mini 2nd Generation-Chalk",
      description:
        "Make your home smarter and your life easier with the Google Home Mini (2nd Gen) in Chalk!\n" +
        "Control your smart devices, play your favorite music, and get answers to your questions—all with simple voice commands.\n" +
        "The compact, stylish design fits perfectly in any room, while the powerful speaker fills your space with rich sound.\n" +
        "Set reminders, check the weather, and enjoy hands-free help from Google Assistant, day or night.\n" +
        "Bring convenience, entertainment, and intelligence to your home with just your voice.",
      price: "1449.99",
      image: "/images/google-home.png",
      category: "Technology",
    },

    12: {
      id: 12,
      name: "Sony WH-1000XM4 Wired Over-Ear Noise-Cancelling",
      description:
        "Immerse yourself in pure audio bliss with the Sony WH-1000XM4 Wired Over-Ear Noise-Cancelling Headphones!\n" +
        "Experience industry-leading noise cancellation that lets you focus on your music, podcasts, or calls—no distractions, just sound.\n" +
        "Enjoy a comfortable, ergonomic fit for hours of listening, and discover rich, detailed audio with every note.\n" +
        "Perfect for travel, work, or relaxation, these headphones are your ticket to a world of uninterrupted sound.\n" +
        "Upgrade your listening experience and hear what you've been missing.",
      price: "109.99",
      image: "/images/sony-headphones.png",
      category: "Technology",
    },

    13: {
      id: 13,
      name: "Custom Bluetooth Mouse",
      description:
        "Enhance your workflow with our Custom Bluetooth Mouse—where style meets precision!\n" +
        "Enjoy smooth, responsive tracking and customizable buttons that adapt to your unique needs, whether you're working or gaming.\n" +
        "The ergonomic design fits comfortably in your hand, reducing fatigue during long sessions.\n" +
        "Connect wirelessly to your laptop, tablet, or desktop for seamless control and freedom of movement.\n" +
        "Make every click count with a mouse that's as unique as you are.",
      price: "329.99",
      image: "/images/mouse.png",
      category: "Technology",
    },

    14: {
      id: 14,
      name: "Digital Pen - Bluetooth Technology",
      description:
        "Unleash your creativity with our Digital Pen featuring advanced Bluetooth Technology!\n" +
        "Write, draw, and interact with your devices effortlessly—perfect for artists, students, and professionals alike.\n" +
        "Enjoy precise, lag-free input on tablets and smartphones, making note-taking and sketching a breeze.\n" +
        "The sleek, comfortable design ensures hours of use without strain, while Bluetooth connectivity keeps you wire-free.\n" +
        "Transform your ideas into reality with a pen that keeps up with your imagination.",
      price: "1249.99",
      image: "/images/magic-pen.png",
      category: "Technology",
    },
    
    15: {
      id: 15,
      name: "Portable and Compact Wireless Keyboard",
      description:
        "Type comfortably anywhere with our Portable and Compact Wireless Keyboard!\n" +
        "Lightweight and slim, it fits easily into your bag or backpack, making it perfect for travel, work, or study on the go.\n" +
        "Enjoy responsive keys and a reliable wireless connection to all your devices—laptop, tablet, or smartphone.\n" +
        "The stylish design and long battery life mean you can work or create wherever inspiration strikes.\n" +
        "Upgrade your typing experience and stay productive, no matter where you are.",
      price: "749.99",
      image: "/images/wireless-keyboard-pink.png",
      category: "Technology",
    },
    
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