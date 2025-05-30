// src/app/api/products/data.ts
export const productsByCategory: Record<string, Array<{ id: number; name: string; price: number; image: string; preOrder?: boolean }>> = {
    Technology: [
        { id: 1, name: "Cable USB-B", price: 109.99, image: "images/usb-cable.png" },
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
    // ... (add the rest of your categories and products here, as in products/route.ts)
};
