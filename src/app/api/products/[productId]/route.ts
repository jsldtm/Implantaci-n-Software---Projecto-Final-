// This API route handles product details requests in the FindItAll portal!
import { NextResponse } from "next/server";

// --- Product details data structure ---
const productDetails = {

    // Technology category
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

    // Office & writing category

    25: {
        id: 25,
        name: "Ergonomic Office Chair",
        description:
        "Work in comfort and style with our Ergonomic Office Chair!\n" +
        "Designed to support your posture and reduce fatigue during long hours at your desk.\n" +
        "Adjustable height, lumbar support, and breathable mesh back keep you cool and comfortable.\n" +
        "Smooth-rolling wheels and a sturdy base make it easy to move around your workspace.\n" +
        "Upgrade your office with a chair that puts your well-being first.",
        price: "1399.99",
        image: "/images/ergonomicchair.png",
        category: "Office & writing",
    },

    26: {
        id: 26,
        name: "Standing Desk Converter",
        description:
        "Transform your workspace with our Standing Desk Converter!\n" +
        "Easily switch between sitting and standing to boost your energy and productivity.\n" +
        "Spacious surface fits your monitor, laptop, and accessories.\n" +
        "Sturdy, adjustable design ensures stability at any height.\n" +
        "Make your workday healthier and more dynamic.",
        price: "1499.99",
        image: "/images/thestandingdesk.png",
        category: "Office & writing",
    },

    27: {
        id: 27,
        name: "Wireless Keyboard & Mouse Combo",
        description:
        "Streamline your workflow with our Wireless Keyboard & Mouse Combo!\n" +
        "Enjoy reliable wireless connectivity and responsive performance for both typing and navigation.\n" +
        "Ergonomic design reduces strain during long sessions.\n" +
        "Perfect for home offices, students, and professionals on the go.\n" +
        "Upgrade your setup with a combo that delivers convenience and comfort.",
        price: "699.99",
        image: "/images/keyboardmousecombo.png",
        category: "Office & writing",
    },

    28: {
        id: 28,
        name: "Noise-Cancelling Headphones",
        description:
        "Focus on your work with our Noise-Cancelling Headphones!\n" +
        "Block out distractions and immerse yourself in music, calls, or podcasts.\n" +
        "Comfortable, over-ear design for all-day wear.\n" +
        "Long battery life and crystal-clear sound quality.\n" +
        "Ideal for busy offices, travel, or study sessions.",
        price: "799.99",
        image: "/images/ancheadphones.png",
        category: "Office & writing",
    },

    29: {
        id: 29,
        name: "Bose Noise-Cancelling Earbuds 'quietcomfort'",
        description:
        "Experience premium sound with Bose Noise-Cancelling Earbuds 'quietcomfort'!\n" +
        "Advanced noise cancellation lets you focus on what matters most.\n" +
        "Compact, comfortable fit for all-day use.\n" +
        "Perfect for calls, music, and productivity on the move.\n" +
        "Enjoy legendary Bose quality in a portable package.",
        price: "699.99",
        image: "/images/ancearphones.png",
        category: "Office & writing",
    },

    30: {
        id: 30,
        name: "Desk Lamp with Adjustable Brightness",
        description:
        "Illuminate your workspace with our Desk Lamp featuring Adjustable Brightness!\n" +
        "Choose the perfect lighting for reading, writing, or computer work.\n" +
        "Sleek, modern design fits any desk or office décor.\n" +
        "Energy-efficient LED technology saves power and lasts longer.\n" +
        "Brighten your day and boost your productivity.",
        price: "499.99",
        image: "/images/desk-lamp.png",
        category: "Office & writing",
    },

    31: {
        id: 31,
        name: "Monitor Stand with Storage",
        description:
        "Organize your desk and improve ergonomics with our Monitor Stand with Storage!\n" +
        "Raises your monitor to eye level, reducing neck and eye strain.\n" +
        "Built-in compartments keep pens, notes, and accessories within reach.\n" +
        "Sturdy construction supports most monitors and laptops.\n" +
        "Declutter your workspace and work more comfortably.",
        price: "399.99",
        image: "/images/monitor-stand.png",
        category: "Office & writing",
    },

    32: {
        id: 32,
        name: "High-Quality Ballpoint Pen Set",
        description:
        "Write smoothly and confidently with our High-Quality Ballpoint Pen Set!\n" +
        "Includes multiple pens with comfortable grips and long-lasting ink.\n" +
        "Perfect for note-taking, journaling, or signing important documents.\n" +
        "Sleek design makes them a stylish addition to any desk.\n" +
        "Enjoy effortless writing every time.",
        price: "299.99",
        image: "/images/ballpoint-pen-set.png",
        category: "Office & writing",
    },

    33: {
        id: 33,
        name: "Fountain Pen with Ink Cartridges",
        description:
        "Elevate your writing with our Fountain Pen and Ink Cartridges!\n" +
        "Smooth, elegant lines for signatures, letters, or creative work.\n" +
        "Includes extra cartridges for long-lasting use.\n" +
        "Ergonomic grip and balanced weight for comfortable writing.\n" +
        "A perfect gift for students, professionals, or pen enthusiasts.",
        price: "399.99",
        image: "/images/fountain-pen.png",
        category: "Office & writing",
    },

    34: {
        id: 34,
        name: "Gel Pen Assortment",
        description:
        "Add color and creativity to your notes with our Gel Pen Assortment!\n" +
        "Smooth, vibrant ink in a variety of colors.\n" +
        "Perfect for planners, journals, or artistic projects.\n" +
        "Comfortable to hold and quick-drying to prevent smudges.\n" +
        "Make every page pop with personality.",
        price: "199.99",
        image: "/images/gel-pen-assortment.png",
        category: "Office & writing",
    },

    35: {
        id: 35,
        name: "Mechanical Pencil Set with Lead Refills",
        description:
        "Write and sketch with precision using our Mechanical Pencil Set with Lead Refills!\n" +
        "Includes multiple pencils and plenty of extra lead.\n" +
        "Ideal for students, artists, and professionals.\n" +
        "Comfortable grip and consistent line quality.\n" +
        "Never run out of sharp, clean writing tools.",
        price: "139.99",
        image: "/images/mechanical-pencil.png",
        category: "Office & writing",
    },

    36: {
        id: 36,
        name: "Notebooks",
        description:
        "Capture your ideas and notes in our versatile Notebooks!\n" +
        "Durable covers and quality paper for smooth writing.\n" +
        "Perfect for school, work, or personal journaling.\n" +
        "Available in various sizes and styles to suit your needs.\n" +
        "Stay organized and inspired wherever you go.",
        price: "99.99",
        image: "/images/notebooks.png",
        category: "Office & writing",
    },

    37: {
        id: 37,
        name: "Planner/Organizer",
        description:
        "Stay on top of your schedule with our Planner/Organizer!\n" +
        "Monthly and weekly layouts help you plan ahead and track your goals.\n" +
        "Durable binding and stylish design make it easy to carry anywhere.\n" +
        "Includes space for notes, to-dos, and important dates.\n" +
        "Boost your productivity and never miss a deadline.",
        price: "159.99",
        image: "/images/planner.png",
        category: "Office & writing",
    },

    38: {
        id: 38,
        name: "Sticky Note Pads",
        description:
        "Keep reminders and ideas visible with our Sticky Note Pads!\n" +
        "Bright colors make your notes stand out.\n" +
        "Perfect for marking pages, leaving messages, or organizing tasks.\n" +
        "Easy to stick and remove without residue.\n" +
        "A must-have for every desk and workspace.",
        price: "59.99",
        image: "/images/sticky-notes.png",
        category: "Office & writing",
    },

    39: {
        id: 39,
        name: "Paper Clips and Binder Clips Assortment",
        description:
        "Organize your documents with our Paper Clips and Binder Clips Assortment!\n" +
        "Includes a variety of sizes for all your paperwork needs.\n" +
        "Durable metal construction for secure holding.\n" +
        "Keep your files neat, tidy, and easy to access.\n" +
        "Essential for offices, schools, and home organization.",
        price: "79.99",
        image: "/images/paper-clips.png",
        category: "Office & writing",
    },

    40: {
        id: 40,
        name: "Stapler and Staples",
        description:
        "Fasten your documents securely with our Stapler and Staples set!\n" +
        "Compact, easy-to-use design fits any desk.\n" +
        "Includes plenty of staples to get you started.\n" +
        "Perfect for reports, assignments, and everyday paperwork.\n" +
        "Reliable performance you can count on.",
        price: "199.99",
        image: "/images/stapler.png",
        category: "Office & writing",
    },

    41: {
        id: 41,
        name: "Hole Puncher",
        description:
        "Prepare your papers for binders with our Hole Puncher!\n" +
        "Sharp, durable blades punch clean holes every time.\n" +
        "Easy to use and comfortable to grip.\n" +
        "Ideal for offices, schools, and home organization.\n" +
        "Keep your documents neat and ready to file.",
        price: "199.99",
        image: "/images/hole-puncher.png",
        category: "Office & writing",
    },

    42: {
        id: 42,
        name: "File Folders",
        description:
        "Sort and store your documents with our File Folders!\n" +
        "Sturdy construction protects your papers from damage.\n" +
        "Colorful options help you organize by project or category.\n" +
        "Perfect for home, school, or office use.\n" +
        "Stay organized and find what you need fast.",
        price: "119.99",
        image: "/images/file-folders.png",
        category: "Office & writing",
    },

    43: {
        id: 43,
        name: "Whiteboard or Corkboard",
        description:
        "Visualize your plans and ideas with our Whiteboard or Corkboard!\n" +
        "Perfect for brainstorming, reminders, or displaying important notes.\n" +
        "Easy to mount and clean, with a durable surface.\n" +
        "Great for offices, classrooms, or home organization.\n" +
        "Keep your goals and inspiration in sight.",
        price: "459.99",
        image: "/images/whiteboard.png",
        category: "Office & writing",
    },

    44: {
        id: 44,
        name: "Dry Erase Markers and Eraser",
        description:
        "Write and erase with ease using our Dry Erase Markers and Eraser set!\n" +
        "Bold, vibrant colors for clear visibility on any whiteboard.\n" +
        "Low-odor ink and easy-clean eraser included.\n" +
        "Perfect for meetings, lessons, or creative sessions.\n" +
        "Make your ideas stand out and wipe away mistakes.",
        price: "159.99",
        image: "/images/dry-erase-markers.png",
        category: "Office & writing",
    },

    45: {
        id: 45,
        name: "Highlighters",
        description:
        "Highlight important information with our Highlighters!\n" +
        "Bright, fade-resistant ink makes key points easy to spot.\n" +
        "Chisel tip for broad or fine lines.\n" +
        "Ideal for studying, note-taking, or organizing documents.\n" +
        "Make your notes more effective and colorful.",
        price: "99.99",
        image: "/images/highlighters.png",
        category: "Office & writing",
    },

    46: {
        id: 46,
        name: "Correction Tape/Fluid",
        description:
        "Fix mistakes quickly with our Correction Tape/Fluid!\n" +
        "Applies smoothly and dries fast for immediate rewriting.\n" +
        "Compact size fits easily in your pencil case or desk drawer.\n" +
        "Perfect for students, professionals, and anyone who writes by hand.\n" +
        "Keep your work neat and error-free.",
        price: "79.99",
        image: "/images/correction-tape.png",
        category: "Office & writing",
    },

    47: {
        id: 47,
        name: "Letter Opener",
        description:
        "Open mail effortlessly with our Letter Opener!\n" +
        "Sharp blade slices through envelopes cleanly and safely.\n" +
        "Ergonomic handle for comfortable use.\n" +
        "A must-have tool for home or office mailrooms.\n" +
        "Make opening mail quick and easy.",
        price: "139.99",
        image: "/images/letter-opener.png",
        category: "Office & writing",
    },

    48: {
        id: 48,
        name: "DYMO Label Maker",
        description:
        "Organize your space with our DYMO Label Maker!\n" +
        "Create custom labels for files, drawers, cables, and more.\n" +
        "Easy-to-use interface and durable label tape.\n" +
        "Perfect for home, office, or classroom organization.\n" +
        "Label everything for a tidy, efficient workspace.",
        price: "599.99",
        image: "/images/label-maker.png",
        category: "Office & writing",
    },

    49: {
        id: 49,
        name: "Laptop Stand",
        description:
        "Improve your posture and comfort with our Laptop Stand!\n" +
        "Raises your laptop to eye level for better ergonomics.\n" +
        "Sturdy, lightweight design is easy to transport.\n" +
        "Non-slip surface keeps your device secure.\n" +
        "Perfect for work, study, or travel.",
        price: "399.99",
        image: "/images/laptop-stand.png",
        category: "Office & writing",
    },

    50: {
        id: 50,
        name: "Another Laptop Stand",
        description:
        "Get extra support and flexibility with Another Laptop Stand!\n" +
        "Adjustable angles for optimal viewing and typing comfort.\n" +
        "Durable construction and portable design.\n" +
        "Ideal for home, office, or on the go.\n" +
        "Upgrade your workspace with a stand that adapts to you.",
        price: "399.99",
        image: "/images/laptop-stand.png",
        category: "Office & writing",
    },    

    // Shirts category
    51: {
        id: 51,
        name: "Classic Cotton T-Shirt",
        description:
        "Enjoy everyday comfort with our Classic Cotton T-Shirt!\n" +
        "Soft, breathable fabric makes it perfect for any season.\n" +
        "Timeless crew neck design pairs well with jeans, shorts, or layers.\n" +
        "Durable stitching ensures long-lasting wear.\n" +
        "A must-have staple for every wardrobe.",
        price: "299.99",
        image: "/images/classic-tshirt.png",
        category: "Shirts",
    },

    52: {
        id: 52,
        name: "V-Neck T-Shirt",
        description:
        "Add a modern touch to your look with our V-Neck T-Shirt!\n" +
        "Made from ultra-soft cotton for all-day comfort.\n" +
        "Flattering neckline and tailored fit suit any style.\n" +
        "Easy to dress up or down for any occasion.\n" +
        "A versatile essential for your closet.",
        price: "319.99",
        image: "/images/vneck-tshirt.png",
        category: "Shirts",
    },

    53: {
        id: 53,
        name: "Polo Shirt",
        description:
        "Stay sharp and casual with our classic Polo Shirt!\n" +
        "Features a ribbed collar, button placket, and soft cotton blend.\n" +
        "Perfect for work, weekends, or a round of golf.\n" +
        "Available in multiple colors for every mood.\n" +
        "Upgrade your smart-casual wardrobe.",
        price: "349.99",
        image: "/images/polo-shirt.png",
        category: "Shirts",
    },

    54: {
        id: 54,
        name: "Button-Down Shirt",
        description:
        "Look polished with our Button-Down Shirt!\n" +
        "Crisp fabric and classic fit make it ideal for work or formal events.\n" +
        "Wear it tucked or untucked for versatile style.\n" +
        "Easy-care material for low-maintenance wear.\n" +
        "A timeless addition to any closet.",
        price: "399.99",
        image: "/images/button-down-shirt.png",
        category: "Shirts",
    },

    55: {
        id: 55,
        name: "Flannel Shirt",
        description:
        "Stay cozy and stylish with our Flannel Shirt!\n" +
        "Soft, brushed fabric keeps you warm on chilly days.\n" +
        "Classic plaid patterns for a laid-back look.\n" +
        "Wear it alone or layered over a tee.\n" +
        "Perfect for casual outings and weekends.",
        price: "399.99",
        image: "/images/flannel-shirt.png",
        category: "Shirts",
    },

    56: {
        id: 56,
        name: "Dress Shirt",
        description:
        "Elevate your formalwear with our Dress Shirt!\n" +
        "Smooth, wrinkle-resistant fabric for a crisp appearance.\n" +
        "Tailored fit and classic collar suit any suit or tie.\n" +
        "Ideal for business, weddings, or special occasions.\n" +
        "Look sharp and feel confident.",
        price: "399.99",
        image: "/images/dress-shirt.png",
        category: "Shirts",
    },

    57: {
        id: 57,
        name: "Linen Shirt",
        description:
        "Keep cool and comfortable with our Linen Shirt!\n" +
        "Lightweight, breathable fabric is perfect for warm weather.\n" +
        "Relaxed fit and natural texture for effortless style.\n" +
        "Great for vacations, beach days, or summer events.\n" +
        "Stay fresh and stylish all season.",
        price: "379.99",
        image: "/images/linen-shirt.png",
        category: "Shirts",
    },

    58: {
        id: 58,
        name: "Graphic Tees",
        description:
        "Express yourself with our Graphic Tees!\n" +
        "Bold prints and fun designs for every personality.\n" +
        "Soft cotton fabric for all-day comfort.\n" +
        "Perfect for casual wear, concerts, or lounging.\n" +
        "Make a statement wherever you go.",
        price: "159.99",
        image: "/images/graphic-tee.png",
        category: "Shirts",
    },

    59: {
        id: 59,
        name: "Long-Sleeve Henley Shirt",
        description:
        "Enjoy classic style with our Long-Sleeve Henley Shirt!\n" +
        "Buttoned placket and soft knit fabric for a relaxed look.\n" +
        "Great for layering or wearing solo.\n" +
        "Ideal for cooler days and casual outings.\n" +
        "A versatile favorite for any wardrobe.",
        price: "219.99",
        image: "/images/henley-shirt.png",
        category: "Shirts",
    },

    60: {
        id: 60,
        name: "Sweatshirt",
        description:
        "Stay warm and comfortable with our classic Sweatshirt!\n" +
        "Soft fleece lining for extra coziness.\n" +
        "Ribbed cuffs and hem for a snug fit.\n" +
        "Perfect for workouts, lounging, or layering.\n" +
        "A must-have for chilly days.",
        price: "399.99",
        image: "/images/sweatshirt.png",
        category: "Shirts",
    },

    61: {
        id: 61,
        name: "Performance Athletic Shirt",
        description:
        "Boost your workout with our Performance Athletic Shirt!\n" +
        "Moisture-wicking fabric keeps you dry and comfortable.\n" +
        "Stretchy, lightweight material moves with you.\n" +
        "Ideal for running, training, or sports.\n" +
        "Stay active and look great.",
        price: "399.99",
        image: "/images/athletic-shirt.png",
        category: "Shirts",
    },

    62: {
        id: 62,
        name: "Tank Tops/Sleeveless Shirt",
        description:
        "Beat the heat with our Tank Tops/Sleeveless Shirt!\n" +
        "Breathable fabric and relaxed fit for maximum comfort.\n" +
        "Great for workouts, beach days, or layering.\n" +
        "Available in a variety of colors.\n" +
        "Stay cool and stylish all summer.",
        price: "239.99",
        image: "/images/tank-top.png",
        category: "Shirts",
    },

    63: {
        id: 63,
        name: "Personalized Shirt",
        description:
        "Create your own style with our Personalized Shirt!\n" +
        "Customizable with your name, logo, or design.\n" +
        "High-quality print and comfortable fit.\n" +
        "Great for gifts, events, or team uniforms.\n" +
        "Show off your unique personality.",
        price: "299.99",
        image: "/images/cropped-top.png",
        category: "Shirts",
    },

    64: {
        id: 64,
        name: "Personalized Sweatshirt",
        description:
        "Design your own Personalized Sweatshirt!\n" +
        "Add your favorite text, image, or logo.\n" +
        "Soft, cozy fabric for all-day comfort.\n" +
        "Perfect for groups, gifts, or special occasions.\n" +
        "Make it truly yours.",
        price: "399.99",
        image: "/images/oversized-shirt.png",
        category: "Shirts",
    },

    65: {
        id: 65,
        name: "Tie-Dye Shirt",
        description:
        "Stand out with our colorful Tie-Dye Shirt!\n" +
        "Unique patterns and vibrant hues for a retro vibe.\n" +
        "Soft, comfortable fabric for everyday wear.\n" +
        "Each shirt is one-of-a-kind.\n" +
        "Bring fun and color to your wardrobe.",
        price: "329.99",
        image: "/images/tie-dye-shirt.png",
        category: "Shirts",
    },

    66: {
        id: 66,
        name: "Denim Shirt",
        description:
        "Add rugged style with our Denim Shirt!\n" +
        "Durable denim fabric and classic snap buttons.\n" +
        "Wear it as a shirt or lightweight jacket.\n" +
        "Pairs well with jeans or chinos.\n" +
        "A timeless piece for any season.",
        price: "589.99",
        image: "/images/denim-shirt.png",
        category: "Shirts",
    },

    67: {
        id: 67,
        name: "Very-very-casual Shirt",
        description:
        "Relax in style with our Very-very-casual Shirt!\n" +
        "Loose fit and soft fabric for ultimate comfort.\n" +
        "Perfect for lounging, errands, or casual outings.\n" +
        "Easy to mix and match with any bottoms.\n" +
        "Your go-to for laid-back days.",
        price: "439.99",
        image: "/images/maternity-shirt.png",
        category: "Shirts",
    },

    68: {
        id: 68,
        name: "Uniform Shirt",
        description:
        "Stay professional with our Uniform Shirt!\n" +
        "Durable, easy-care fabric for daily wear.\n" +
        "Classic design suitable for work, school, or teams.\n" +
        "Comfortable fit for all-day use.\n" +
        "Look sharp and ready for anything.",
        price: "429.99",
        image: "/images/uniform-shirt.png",
        category: "Shirts",
    },

    69: {
        id: 69,
        name: "Vintage/Retro Style Shirt",
        description:
        "Bring back the classics with our Vintage/Retro Style Shirt!\n" +
        "Retro prints and colors for a nostalgic look.\n" +
        "Soft, comfortable fabric for modern comfort.\n" +
        "Great for themed parties or everyday wear.\n" +
        "Show off your unique style.",
        price: "299.99",
        image: "/images/vintage-shirt.png",
        category: "Shirts",
    },

    70: {
        id: 70,
        name: "Thermal Shirt",
        description:
        "Stay warm with our Thermal Shirt!\n" +
        "Insulating fabric keeps you cozy in cold weather.\n" +
        "Snug fit for layering under jackets or sweaters.\n" +
        "Ideal for outdoor activities or winter days.\n" +
        "Beat the chill in style.",
        price: "349.99",
        image: "/images/thermal-shirt.png",
        category: "Shirts",
    },

    71: {
        id: 71,
        name: "Pocket Tees",
        description:
        "Keep it simple with our Pocket Tees!\n" +
        "Classic t-shirt with a handy chest pocket.\n" +
        "Soft, breathable fabric for everyday comfort.\n" +
        "Available in a range of colors.\n" +
        "A casual essential for any wardrobe.",
        price: "339.99",
        image: "/images/pocket-tee.png",
        category: "Shirts",
    },

    72: {
        id: 72,
        name: "Raglan Sleeve Shirt",
        description:
        "Move freely with our Raglan Sleeve Shirt!\n" +
        "Contrasting sleeves and relaxed fit for sporty style.\n" +
        "Great for athletics or casual wear.\n" +
        "Soft, stretchy fabric for comfort.\n" +
        "Add a sporty touch to your look.",
        price: "344.99",
        image: "/images/raglan-shirt.png",
        category: "Shirts",
    },

    73: {
        id: 73,
        name: "Band/Music T-Shirt",
        description:
        "Show your love for music with our Band/Music T-Shirt!\n" +
        "Features iconic band logos and album art.\n" +
        "Soft cotton for all-day wear.\n" +
        "Perfect for concerts, festivals, or casual days.\n" +
        "Rock your favorite band in style.",
        price: "249.99",
        image: "/images/band-tshirt.png",
        category: "Shirts",
    },

    74: {
        id: 74,
        name: "Holiday-Themed Shirt",
        description:
        "Celebrate in style with our Holiday-Themed Shirt!\n" +
        "Festive prints for every occasion—Christmas, Halloween, and more.\n" +
        "Comfortable fit and soft fabric.\n" +
        "Great for parties, family gatherings, or gifts.\n" +
        "Spread holiday cheer all year round.",
        price: "329.99",
        image: "/images/holiday-shirt.png",
        category: "Shirts",
    },

    75: {
        id: 75,
        name: "Long-Sleeve T-Shirt",
        description:
        "Stay comfortable with our Long-Sleeve T-Shirt!\n" +
        "Lightweight fabric for year-round wear.\n" +
        "Perfect for layering or wearing solo.\n" +
        "Classic fit and simple style.\n" +
        "A versatile staple for any season.",
        price: "299.99",
        image: "/images/custom-tshirt.png",
        category: "Shirts",
    },

    // Household category
    76: {
        id: 76,
        name: "Bedding Set (Full/Queen)",
        description:
        "Transform your bedroom into a cozy retreat with our luxurious Bedding Set (Full/Queen)!\n" +
        "Enjoy the perfect blend of softness and durability, designed to keep you comfortable all night long.\n" +
        "This set includes everything you need for a restful sleep—fitted sheet, flat sheet, and matching pillowcases.\n" +
        "Easy to care for and made to last, it’s the ideal upgrade for any bedroom décor.\n" +
        "Drift off in style and comfort every night with bedding that feels as good as it looks.",
        price: "119.99",
        image: "/images/bedding-set.png",
        category: "Household",
    },

    77: {
        id: 77,
        name: "Pillows",
        description:
        "Experience cloud-like comfort with our premium Pillows!\n" +
        "Designed to provide the perfect balance of softness and support, these pillows help you wake up refreshed and ready for the day.\n" +
        "Hypoallergenic materials ensure a healthy sleep environment, while the plush filling adapts to your preferred sleeping position.\n" +
        "Ideal for bedrooms, guest rooms, or anywhere you need a touch of comfort.\n" +
        "Upgrade your sleep and enjoy the difference a great pillow can make.",
        price: "399.99",
        image: "/images/pillows.png",
        category: "Household",
    },

    78: {
        id: 78,
        name: "Blankets and Throws",
        description:
        "Wrap yourself in warmth and style with our Blankets and Throws!\n" +
        "Perfect for chilly nights, cozy movie marathons, or adding a decorative touch to your living space.\n" +
        "Made from ultra-soft, breathable materials that keep you comfortable year-round.\n" +
        "Available in a variety of colors and patterns to match any décor.\n" +
        "Snuggle up and enjoy comfort that’s always within reach.",
        price: "529.99",
        image: "/images/blankets.png",
        category: "Household",
    },

    79: {
        id: 79,
        name: "Towels (Bath)",
        description:
        "Step out of the shower and into luxury with our Bath Towels!\n" +
        "Super absorbent and incredibly soft, these towels make every bath or shower feel like a spa experience.\n" +
        "Durable, quick-drying, and gentle on your skin, they’re perfect for daily use.\n" +
        "Choose from a range of colors to complement your bathroom décor.\n" +
        "Elevate your routine with towels that pamper you every time.",
        price: "199.99",
        image: "/images/towels.png",
        category: "Household",
    },

    80: {
        id: 80,
        name: "Kitchen Utensil Set",
        description:
        "Upgrade your kitchen with our complete Kitchen Utensil Set!\n" +
        "This set includes all the essentials—spatula, ladle, whisk, tongs, and more—crafted for durability and ease of use.\n" +
        "Ergonomic handles provide a comfortable grip, while heat-resistant materials ensure safe cooking.\n" +
        "Perfect for home chefs, beginners, or anyone looking to refresh their kitchen tools.\n" +
        "Cook, serve, and create with confidence using utensils you can trust.",
        price: "449.99",
        image: "/images/kitchen-utensils.png",
        category: "Household",
    },

    81: {
        id: 81,
        name: "Cookware Set (5-piece basic)",
        description:
        "Cook like a pro with our 5-piece basic Cookware Set!\n" +
        "Includes essential pots and pans for boiling, sautéing, and simmering your favorite dishes.\n" +
        "Non-stick surfaces make cooking and cleanup a breeze, while sturdy construction ensures even heat distribution.\n" +
        "Ideal for new kitchens, students, or anyone ready to upgrade their cookware.\n" +
        "Enjoy delicious meals with cookware that’s built to last.",
        price: "999.99",
        image: "/images/cookware-set.png",
        category: "Household",
    },

    82: {
        id: 82,
        name: "Dinnerware Set (4 place settings)",
        description:
        "Set the table in style with our Dinnerware Set for four!\n" +
        "Includes plates, bowls, and cups—everything you need for family meals or entertaining guests.\n" +
        "Crafted from durable, chip-resistant materials that look great and stand up to everyday use.\n" +
        "Modern designs and classic colors complement any dining décor.\n" +
        "Make every meal special with dinnerware that’s as practical as it is beautiful.",
        price: "799.99",
        image: "/images/dinnerware-set.png",
        category: "Household",
    },

    83: {
        id: 83,
        name: "Glassware Set (6 drinking glasses)",
        description:
        "Raise a glass to style and functionality with our Glassware Set!\n" +
        "This set of six drinking glasses is perfect for water, juice, cocktails, and more.\n" +
        "Crystal-clear glass adds elegance to any table, while the sturdy design resists chips and cracks.\n" +
        "Dishwasher safe for easy cleanup after any gathering.\n" +
        "Enjoy every sip with glassware that’s made to impress.",
        price: "399.99",
        image: "/images/glassware-set.png",
        category: "Household",
    },

    84: {
        id: 84,
        name: "Cutlery Set (4 place settings)",
        description:
        "Dine in style with our Cutlery Set for four!\n" +
        "Includes forks, knives, and spoons—everything you need for everyday meals or special occasions.\n" +
        "Made from high-quality stainless steel for lasting shine and durability.\n" +
        "Ergonomic handles provide comfort and balance with every bite.\n" +
        "Upgrade your table setting with cutlery that combines elegance and practicality.",
        price: "399.99",
        image: "/images/cutlery-set.png",
        category: "Household",
    },

    85: {
        id: 85,
        name: "Food Storage Containers (set of several)",
        description:
        "Keep your food fresh and organized with our Food Storage Containers set!\n" +
        "Perfect for meal prep, leftovers, and snacks on the go.\n" +
        "Airtight lids lock in freshness, while stackable designs save space in your fridge or pantry.\n" +
        "Durable, BPA-free materials are safe for microwave, freezer, and dishwasher use.\n" +
        "Make mealtime easier with containers that fit your busy lifestyle.",
        price: "299.99",
        image: "/images/food-storage.png",
        category: "Household",
    },

    86: {
        id: 86,
        name: "Cleaning Supplies (bundle of essentials)",
        description:
        "Tackle any mess with our Cleaning Supplies bundle of essentials!\n" +
        "Includes all the basics—sponges, scrubbers, sprays, and more—to keep your home sparkling clean.\n" +
        "Safe, effective formulas make cleaning quick and easy, while ergonomic tools help you reach every corner.\n" +
        "Perfect for kitchens, bathrooms, and every room in between.\n" +
        "Enjoy a fresher, cleaner home with supplies you can count on.",
        price: "789.99",
        image: "/images/cleaning-supplies.png",
        category: "Household",
    },

    87: {
        id: 87,
        name: "Laundry Detergent",
        description:
        "Get clothes clean and fresh with our powerful Laundry Detergent!\n" +
        "Formulated to remove tough stains and odors while being gentle on fabrics and skin.\n" +
        "Suitable for all washing machines and safe for colors and whites alike.\n" +
        "A little goes a long way, making it a smart choice for families and individuals.\n" +
        "Enjoy laundry day with detergent that delivers results you can see and feel.",
        price: "239.99",
        image: "/images/laundry-detergent.png",
        category: "Household",
    },

    88: {
        id: 88,
        name: "Trash Cans",
        description:
        "Keep your space tidy and organized with our durable Trash Cans!\n" +
        "Designed for easy use and hassle-free cleaning, these cans fit perfectly in kitchens, bathrooms, or offices.\n" +
        "Sturdy construction and a sleek design make them both practical and stylish.\n" +
        "Available in multiple sizes to suit your needs.\n" +
        "Make waste disposal simple and efficient every day.",
        price: "299.99",
        image: "/images/trash-can.png",
        category: "Household",
    },

    89: {
        id: 89,
        name: "Light Bulbs (4-pack LED)",
        description:
        "Brighten your home and save energy with our 4-pack of LED Light Bulbs!\n" +
        "Long-lasting and energy-efficient, these bulbs provide clear, consistent light for any room.\n" +
        "Easy to install and compatible with most fixtures, they’re perfect for replacing old incandescent bulbs.\n" +
        "Enjoy lower electricity bills and fewer replacements.\n" +
        "Illuminate your space with bulbs that are good for your wallet and the planet.",
        price: "699.99",
        image: "/images/light-bulbs.png",
        category: "Household",
    },

    90: {
        id: 90,
        name: "Extension Cords and Power Strips",
        description:
        "Power up your devices safely with our Extension Cords and Power Strips!\n" +
        "Perfect for home offices, entertainment centers, or anywhere you need extra outlets.\n" +
        "Built-in surge protection keeps your electronics safe from power spikes.\n" +
        "Flexible, tangle-free cords make setup easy and convenient.\n" +
        "Stay connected and organized with power solutions you can trust.",
        price: "199.99",
        image: "/images/extension-cords.png",
        category: "Household",
    },

    91: {
        id: 91,
        name: "Picture Frames",
        description:
        "Showcase your favorite memories with our elegant Picture Frames!\n" +
        "Designed to complement any décor, these frames are perfect for photos, artwork, or certificates.\n" +
        "Easy to hang or display on a tabletop, with sturdy backing and clear glass fronts.\n" +
        "Mix and match sizes for a personalized gallery wall.\n" +
        "Preserve your special moments in style.",
        price: "199.99",
        image: "/images/picture-frames.png",
        category: "Household",
    },

    92: {
        id: 92,
        name: "Candles",
        description:
        "Create a warm, inviting atmosphere with our premium Candles!\n" +
        "Perfect for relaxing evenings, special occasions, or adding a touch of elegance to any room.\n" +
        "Long-lasting and available in a variety of scents and colors to suit your mood.\n" +
        "Made from high-quality wax for a clean, even burn every time.\n" +
        "Light up your space and enjoy the soothing glow of candlelight.",
        price: "239.99",
        image: "/images/candles.png",
        category: "Household",
    },

    93: {
        id: 93,
        name: "Bathroom Accessories Set (3-piece basic)",
        description:
        "Refresh your bathroom with our 3-piece Bathroom Accessories Set!\n" +
        "Includes a soap dispenser, toothbrush holder, and tumbler—everything you need for a tidy, stylish space.\n" +
        "Modern designs and durable materials make these accessories both functional and attractive.\n" +
        "Easy to clean and perfect for any bathroom décor.\n" +
        "Upgrade your daily routine with accessories that make a difference.",
        price: "349.99",
        image: "/images/bathroom-accessories.png",
        category: "Household",
    },

    94: {
        id: 94,
        name: "Storage Bins",
        description:
        "Organize your home with our versatile Storage Bins!\n" +
        "Ideal for closets, shelves, or under the bed, these bins help you keep everything in its place.\n" +
        "Durable construction and convenient handles make them easy to move and stack.\n" +
        "Great for toys, clothes, or seasonal items.\n" +
        "Declutter your space and enjoy a more organized home.",
        price: "199.99",
        image: "/images/storage-bins.png",
        category: "Household",
    },

    95: {
        id: 95,
        name: "Plants (small potted)",
        description:
        "Bring life and color to your space with our small potted Plants!\n" +
        "Perfect for desks, shelves, or windowsills, these plants add a touch of nature to any room.\n" +
        "Easy to care for and ideal for both beginners and experienced plant lovers.\n" +
        "Choose from a variety of species to suit your style.\n" +
        "Enjoy the beauty and benefits of greenery indoors.",
        price: "299.99",
        image: "/images/plants.png",
        category: "Household",
    },

    96: {
        id: 96,
        name: "Doormats",
        description:
        "Welcome guests in style with our durable Doormats!\n" +
        "Designed to trap dirt and moisture, keeping your floors clean and dry.\n" +
        "Non-slip backing ensures safety, while attractive designs add curb appeal to your entryway.\n" +
        "Easy to clean and built to last through every season.\n" +
        "Make a great first impression with a doormat that works as hard as you do.",
        price: "349.99",
        image: "/images/doormats.png",
        category: "Household",
    },

    97: {
        id: 97,
        name: "Iron and Ironing Board",
        description:
        "Keep your clothes looking sharp with our Iron and Ironing Board set!\n" +
        "The powerful iron smooths out wrinkles quickly, while the sturdy board provides a stable surface for all your garments.\n" +
        "Adjustable height and foldable design make storage easy and convenient.\n" +
        "Perfect for everyday use or last-minute touch-ups.\n" +
        "Look your best with ironing essentials that make the job simple.",
        price: "649.99",
        image: "/images/iron-board.png",
        category: "Household",
    },

    98: {
        id: 98,
        name: "Vacuum Cleaner (basic model)",
        description:
        "Make cleaning effortless with our basic model Vacuum Cleaner!\n" +
        "Powerful suction removes dirt, dust, and debris from carpets and hard floors alike.\n" +
        "Lightweight and easy to maneuver, with a compact design for convenient storage.\n" +
        "Ideal for apartments, dorms, or any home that needs reliable cleaning power.\n" +
        "Enjoy a spotless space with a vacuum that gets the job done.",
        price: "1249.99",
        image: "/images/vacuum-cleaner.png",
        category: "Household",
    },

    99: {
        id: 99,
        name: "Febreze Air Aromatizante Linen & Sky - 6 Pack",
        description:
        "Refresh your home with the clean scent of Febreze Air Aromatizante Linen & Sky!\n" +
        "This 6-pack keeps every room smelling fresh and inviting, eliminating odors with just a quick spray.\n" +
        "Safe for use on fabrics and in the air, perfect for bedrooms, bathrooms, and living spaces.\n" +
        "Long-lasting fragrance that lifts your mood and brightens your day.\n" +
        "Breathe easy and enjoy a home that always smells its best.",
        price: "1429.99",
        image: "/images/air-freshener.png",
        category: "Household",
    },

    100: {
        id: 100,
        name: "First Aid Kit (basic)",
        description:
        "Be prepared for life’s little emergencies with our basic First Aid Kit!\n" +
        "Includes bandages, antiseptic wipes, gauze, and more—everything you need for minor injuries and accidents.\n" +
        "Compact and portable, perfect for home, car, or travel.\n" +
        "Easy to use and organized for quick access in any situation.\n" +
        "Stay safe and confident knowing help is always close at hand.",
        price: "349.99",
        image: "/images/first-aid-kit.png",
        category: "Household",
    },

    // Movies & TV category    
    101: {
        id: 101,
        name: "TV Samsung 32'' HD Smart TV LED",
        description:
        "Upgrade your home entertainment with the Samsung 32'' HD Smart TV LED!\n" +
        "Enjoy crisp, vibrant visuals and immersive sound for your favorite shows, movies, and games.\n" +
        "Smart features let you stream content from popular apps, browse the web, and connect your devices with ease.\n" +
        "The sleek, modern design fits perfectly in any room, while energy-efficient technology keeps your bills low.\n" +
        "Bring cinematic experiences home with a TV that delivers quality and convenience.",
        price: "3499.99",
        image: "/images/led-tv.png",
        category: "Movies & TV",
    },

    102: {
        id: 102,
        name: "Portable Mini Projector",
        description:
        "Turn any space into a theater with our Portable Mini Projector!\n" +
        "Perfect for movie nights, presentations, or gaming on the big screen—just plug in and play.\n" +
        "Compact and lightweight, it’s easy to take anywhere, from living rooms to backyards.\n" +
        "Enjoy sharp, clear images and simple connectivity with HDMI and USB ports.\n" +
        "Make every gathering memorable with a projector that brings your content to life.",
        price: "159.99",
        image: "/images/mini-projector.png",
        category: "Movies & TV",
    },

    103: {
        id: 103,
        name: "TV Wall Mount (fixed)",
        description:
        "Save space and showcase your TV with our sturdy TV Wall Mount (fixed)!\n" +
        "Designed for easy installation and secure support, it keeps your screen flush against the wall for a clean, modern look.\n" +
        "Compatible with most flat-screen TVs and includes all necessary hardware.\n" +
        "Perfect for living rooms, bedrooms, or offices—enjoy the best viewing angle every time.\n" +
        "Upgrade your setup and enjoy a clutter-free entertainment area.",
        price: "439.99",
        image: "/images/tv-wall-mount.png",
        category: "Movies & TV",
    },

    104: {
        id: 104,
        name: "Indoor HD TV Antenna",
        description:
        "Cut the cord and enjoy free HD channels with our Indoor HD TV Antenna!\n" +
        "Easy to install and discreet, it delivers crystal-clear reception for local news, sports, and entertainment.\n" +
        "No monthly fees—just plug in and start watching.\n" +
        "Slim design fits behind your TV or on a window for optimal signal.\n" +
        "Stay connected to your favorite shows without the cable bill.",
        price: "399.99",
        image: "/images/hd-tv-antenna.png",
        category: "Movies & TV",
    },

    105: {
        id: 105,
        name: "Universal Remote Control",
        description:
        "Simplify your entertainment with our Universal Remote Control!\n" +
        "Easily operate your TV, streaming devices, DVD players, and more—all with one remote.\n" +
        "User-friendly design and programmable buttons make setup a breeze.\n" +
        "Perfect for replacing lost remotes or reducing clutter on your coffee table.\n" +
        "Enjoy seamless control of your home theater experience.",
        price: "299.99",
        image: "/images/universal-remote.png",
        category: "Movies & TV",
    },

    106: {
        id: 106,
        name: "HDMI Cable",
        description:
        "Connect your devices with confidence using our high-quality HDMI Cable!\n" +
        "Supports full HD and 4K video, delivering sharp images and clear sound for all your entertainment needs.\n" +
        "Durable construction ensures a reliable connection between TVs, projectors, gaming consoles, and more.\n" +
        "Flexible and tangle-free for easy setup and storage.\n" +
        "Upgrade your home theater with a cable you can trust.",
        price: "199.99",
        image: "/images/hdmi-cable.png",
        category: "Movies & TV",
    },

    107: {
        id: 107,
        name: "TV Stand (simple design)",
        description:
        "Display your TV in style with our simple yet elegant TV Stand!\n" +
        "Sturdy construction supports most flat-screen TVs and provides ample space for media players and accessories.\n" +
        "Easy to assemble and fits seamlessly into any décor.\n" +
        "Keep your entertainment area organized and clutter-free.\n" +
        "A practical solution for any living room or bedroom.",
        price: "799.99",
        image: "/images/tv-stand.png",
        category: "Movies & TV",
    },

    108: {
        id: 108,
        name: "Portable DVD Player 17.5''",
        description:
        "Enjoy your favorite movies anywhere with our Portable DVD Player (17.5'')!\n" +
        "Large, vibrant screen and built-in speakers deliver an immersive viewing experience on the go.\n" +
        "Perfect for road trips, flights, or relaxing at home.\n" +
        "Long battery life and multiple format support ensure endless entertainment.\n" +
        "Take your movie collection wherever you travel.",
        price: "899.99",
        image: "/images/dvd-player.png",
        category: "Movies & TV",
    },

    109: {
        id: 109,
        name: "The Godfather (DVD)",
        description:
        "We'll make you an offer you can't refuse: Experience cinematic greatness with The Godfather on DVD!\n" +
        "This iconic film tells the epic story of the Corleone family, blending drama, suspense, and unforgettable performances.\n" +
        "A must-have for any movie lover's collection.\n" +
        "Enjoy bonus features and pristine picture quality.\n" +
        "Relive the classic that redefined the gangster genre.",
        price: "399.99",
        image: "/images/THE-godfather.png",
        category: "Movies & TV",
    },

    110: {
        id: 110,
        name: "Star Wars: A New Hope (Blu-ray)",
        description:
        "Travel to a galaxy far, far away with Star Wars: A New Hope on Blu-ray!\n" +
        "Join Luke Skywalker, Princess Leia, and Han Solo in the adventure that started it all.\n" +
        "Stunning high-definition visuals and remastered sound bring the Force to life.\n" +
        "Includes special features for fans and collectors.\n" +
        "The perfect addition to any sci-fi or Star Wars collection.",
        price: "399.99",
        image: "/images/thatsnomoon.png",
        category: "Movies & TV",
    },

    111: {
        id: 111,
        name: "Once Upon a Time...in Hollywood (DVD)",
        description:
        "Step into 1969 Los Angeles with Once Upon a Time...in Hollywood on DVD!\n" +
        "Directed by Quentin Tarantino, this film blends nostalgia, humor, and suspense with a star-studded cast.\n" +
        "Enjoy behind-the-scenes extras and stunning visuals.\n" +
        "A must-watch for fans of cinema and Tarantino’s unique style.\n" +
        "Add this modern classic to your movie library.",
        price: "330.99",
        image: "/images/ouatih.png",
        category: "Movies & TV",
    },

    112: {
        id: 112,
        name: "The Shawshank Redemption (Blu-ray)",
        description:
        "Rediscover hope and friendship with The Shawshank Redemption on Blu-ray!\n" +
        "This beloved drama tells the inspiring story of Andy Dufresne and Red inside Shawshank Prison.\n" +
        "Enjoy breathtaking high-definition visuals and exclusive bonus content.\n" +
        "A timeless tale of resilience and redemption.\n" +
        "Essential viewing for every film enthusiast.",
        price: "399.99",
        image: "/images/shawshank-redemption.png",
        category: "Movies & TV",
    },

    113: {
        id: 113,
        name: "Forrest Gump (DVD)",
        description:
        "Relive the heartwarming journey of Forrest Gump on DVD!\n" +
        "Follow Forrest through decades of American history, love, and adventure.\n" +
        "Tom Hanks delivers an Oscar-winning performance in this unforgettable film.\n" +
        "Includes special features and behind-the-scenes insights.\n" +
        "A touching story that will make you laugh, cry, and believe in miracles.",
        price: "399.99",
        image: "/images/forrest-gump.png",
        category: "Movies & TV",
    },

    114: {
        id: 114,
        name: "The Lord of the Rings: The Fellowship of the Ring (Blu-ray)",
        description:
        "Embark on an epic quest with The Lord of the Rings: The Fellowship of the Ring on Blu-ray!\n" +
        "Join Frodo, Gandalf, and the Fellowship as they journey to destroy the One Ring.\n" +
        "Stunning visuals and immersive sound bring Middle-earth to life.\n" +
        "Includes hours of bonus content for fans and collectors.\n" +
        "A fantasy masterpiece for your home theater.",
        price: "22",
        image: "/images/lotr-fellowship.png",
        category: "Movies & TV",
    },

    115: {
        id: 115,
        name: "The Dark Knight Trilogy (Blu-ray)",
        description:
        "Experience the legendary Dark Knight Trilogy on Blu-ray!\n" +
        "Follow Batman's journey from origin to hero in Christopher Nolan’s acclaimed films.\n" +
        "Includes Batman Begins, The Dark Knight, and The Dark Knight Rises—all in stunning HD.\n" +
        "Packed with special features and behind-the-scenes content.\n" +
        "A must-have for superhero and action movie fans.",
        price: "329.99",
        image: "/images/the-dark-knight.png",
        category: "Movies & TV",
    },

    116: {
        id: 116,
        name: "Citizen Kane (DVD)",
        description:
        "Own a piece of film history with Citizen Kane on DVD!\n" +
        "Widely regarded as the greatest film ever made, this classic explores the rise and fall of Charles Foster Kane.\n" +
        "Restored visuals and insightful commentary enhance your viewing experience.\n" +
        "Essential for students, critics, and lovers of cinema.\n" +
        "Discover the story behind 'Rosebud' and cinematic innovation.",
        price: "389.99",
        image: "/images/rosebud.png",
        category: "Movies & TV",
    },

    117: {
        id: 117,
        name: "Frasier - The Complete Series (DVD)",
        description:
        "Laugh along with Dr. Frasier Crane in The Complete Series on DVD!\n" +
        "All seasons and episodes of the beloved iconic sitcom, packed with witty humor and memorable moments.\n" +
        "Bonus features include cast interviews and behind-the-scenes footage.\n" +
        "Perfect for binge-watching or reliving your favorite episodes.\n" +
        "A must-have for fans of classic TV comedy.",
        price: "1599.99",
        image: "/images/DontStareAtMeEddie.png",
        category: "Movies & TV",
    },

    118: {
        id: 118,
        name: "Seinfeld - The Complete Series (DVD)",
        description:
        "Enjoy every hilarious moment with Seinfeld - The Complete Series on DVD!\n" +
        "All nine seasons of the iconic 'show about nothing,' featuring Jerry, George, Elaine, and Kramer.\n" +
        "Packed with extras, bloopers, and behind-the-scenes content.\n" +
        "Relive classic episodes and unforgettable catchphrases.\n" +
        "A must-own for sitcom lovers and collectors.",
        price: "1599.99",
        image: "/images/TomsRestaurant.png",
        category: "Movies & TV",
    },

    119: {
        id: 119,
        name: "The Studio - Season 1 (DVD)",
        description:
        "Step into the world of creativity with The Studio - Season 1 on DVD!\n" +
        "Follow the drama, passion, and artistry behind the scenes of a bustling studio.\n" +
        "Includes all episodes and exclusive bonus content.\n" +
        "Perfect for fans of drama and behind-the-scenes storytelling.\n" +
        "Add this unique series to your collection today.",
        price: "499.99",
        image: "/images/templeOfCinema.png",
        category: "Movies & TV",
    },

    120: {
        id: 120,
        name: "Game of Thrones - Season 1 (Blu-ray)",
        description:
        "Enter the epic world of Westeros with Game of Thrones - Season 1 on Blu-ray!\n" +
        "Experience the intrigue, battles, and unforgettable characters in stunning HD.\n" +
        "Includes hours of bonus features, commentaries, and behind-the-scenes footage.\n" +
        "A must-have for fantasy fans and collectors.\n" +
        "Relive the season that started it all.",
        price: "499.99",
        image: "/images/game-of-thrones.png",
        category: "Movies & TV",
    },

    121: {
        id: 121,
        name: "I Love Lucy - Season 1 (DVD)",
        description:
        "Rediscover classic comedy with I Love Lucy - Season 1 on DVD!\n" +
        "All original episodes featuring Lucille Ball’s timeless humor and charm.\n" +
        "Restored visuals and bonus content for fans old and new.\n" +
        "Perfect for family viewing and collectors of TV history.\n" +
        "Laugh out loud with one of television’s greatest shows.",
        price: "599.99",
        image: "/images/i-love-lucy.png",
        category: "Movies & TV",
    },

    122: {
        id: 122,
        name: "Cheers - Classic Episodes (DVD)",
        description:
        "Pull up a stool at Cheers with this collection of Classic Episodes on DVD!\n" +
        "Relive the laughs, friendships, and unforgettable moments from the iconic bar.\n" +
        "Includes fan-favorite episodes and bonus features.\n" +
        "A great gift for fans of classic sitcoms and TV nostalgia.\n" +
        "Where everybody knows your name!",
        price: "599.99",
        image: "/images/whereEverybodyKnowsYourName.png",
        category: "Movies & TV",
    },

    123: {
        id: 123,
        name: "E.T. the Extra-Terrestrial (DVD)",
        description:
        "Bring home the magic of E.T. the Extra-Terrestrial on DVD!\n" +
        "Steven Spielberg’s beloved classic about friendship, adventure, and wonder.\n" +
        "Includes bonus features and behind-the-scenes content.\n" +
        "Perfect for family movie nights and collectors of timeless films.\n" +
        "Phone home and relive the adventure.",
        price: "339.99",
        image: "/images/phonehomewithskype.png",
        category: "Movies & TV",
    },

    124: {
        id: 124,
        name: "Back to the Future (Blu-ray)",
        description:
        "Travel through time with Back to the Future on Blu-ray!\n" +
        "Join Marty McFly and Doc Brown in the adventure of a lifetime.\n" +
        "Remastered visuals and sound for the ultimate viewing experience.\n" +
        "Includes special features and behind-the-scenes extras.\n",
        price: "339.99",
        image: "/images/greatscott.png",
        category: "Movies & TV",
    },

    125: {
        id: 125,
        name: "Jurassic Park (Blu-ray)",
        description:
        "Experience the thrill of Jurassic Park on Blu-ray!\n" +
        "Steven Spielberg's groundbreaking adventure brings dinosaurs to life like never before.\n" +
        "Enjoy stunning HD visuals, remastered sound, and bonus features.\n" +
        "Perfect for fans of action, adventure, and movie magic.\n" +
        "Life finds a way—add it to your collection.",
        price: "349.99",
        image: "/images/lifeFindsAWay.png",
        category: "Movies & TV",
    },

    126: {
        id: 126,
        name: "As Good as It Gets (DVD)",
        description:
        "Enjoy heartfelt comedy and drama with As Good as It Gets on DVD!\n" +
        "Jack Nicholson and Helen Hunt shine in this Oscar-winning film about love, friendship, and second chances.\n" +
        "Includes bonus features and insightful commentary.\n" +
        "A touching story that's both funny and inspiring.\n" +
        "Perfect for fans of romantic comedies and classic cinema.",
        price: "399.99",
        image: "/images/verdell.png",
        category: "Movies & TV",
    },

    127: {
        id: 127,
        name: "Chinatown (DVD)",
        description:
        "Dive into mystery and intrigue with Chinatown on DVD!\n" +
        "Roman Polanski's neo-noir masterpiece stars Jack Nicholson in a tale of corruption and secrets in 1930s Los Angeles.\n" +
        "Restored visuals and bonus content enhance the experience.\n" +
        "A must-watch for fans of film noir and classic Hollywood.\n" +
        "Add this critically acclaimed film to your collection.",
        price: "399.99",
        image: "/images/chinatown.png",
        category: "Movies & TV",
    },

    128: {
        id: 128,
        name: "Casablanca (DVD)",
        description:
        "Relive the romance and drama of Casablanca on DVD!\n" +
        "This timeless classic stars Humphrey Bogart and Ingrid Bergman in a story of love, sacrifice, and intrigue during WWII.\n" +
        "Beautifully restored with bonus features and commentary.\n" +
        "A must-have for movie lovers and collectors of Hollywood’s golden age.\n" +
        "Here's looking at you, kid.",
        price: "379.99",
        image: "/images/casablanca.png",
        category: "Movies & TV",
    },

    129: {
        id: 129,
        name: "Automatic Pet Feeder (basic timer)",
        description:
        "Make mealtime easy and consistent with our Automatic Pet Feeder (basic timer)!\n" +
        "Perfect for busy pet owners, this feeder dispenses food at scheduled times, ensuring your furry friend never misses a meal.\n" +
        "Simple to set up and easy to clean, it’s ideal for both cats and dogs.\n" +
        "Reliable timer function helps manage portion control and feeding routines.\n" +
        "Give your pet the care they deserve, even when you’re not home.",
        price: "40",
        image: "/images/pet-feeder.png",
        category: "Pet supplies",
    },

    130: {
        id: 130,
        name: "Pet Water Fountain",
        description:
        "Keep your pet hydrated and healthy with our Pet Water Fountain!\n" +
        "Continuous circulation provides fresh, filtered water all day long, encouraging pets to drink more.\n" +
        "Quiet operation and easy-to-clean design make it perfect for any home.\n" +
        "Ideal for cats and small dogs, with a large capacity to reduce refills.\n" +
        "Upgrade your pet’s water bowl for better wellness.",
        price: "30",
        image: "/images/pet-water-fountain.png",
        category: "Pet supplies",
    },

    131: {
        id: 131,
        name: "Retractable Dog Leash",
        description:
        "Enjoy safe, flexible walks with our Retractable Dog Leash!\n" +
        "The strong, tangle-free cord extends and retracts smoothly, giving your dog freedom to explore while you stay in control.\n" +
        "Comfortable grip handle and secure locking mechanism for easy use.\n" +
        "Perfect for daily walks, training, or adventures in the park.\n" +
        "Walk your dog with confidence and convenience.",
        price: "20",
        image: "/images/dog-leash.png",
        category: "Pet supplies",
    },

    132: {
        id: 132,
        name: "Harness for Dogs (various sizes)",
        description:
        "Ensure comfort and safety on every walk with our Harness for Dogs (various sizes)!\n" +
        "Adjustable straps provide a secure, custom fit for dogs of all shapes and sizes.\n" +
        "Padded design reduces strain on your pet’s neck and chest.\n" +
        "Easy to put on and take off, with sturdy D-rings for leash attachment.\n" +
        "Great for training, travel, or everyday use.",
        price: "25",
        image: "/images/dog-harness.png",
        category: "Pet supplies",
    },

    133: {
        id: 133,
        name: "Pet Grooming Clippers (basic kit)",
        description:
        "Keep your pet looking their best with our Pet Grooming Clippers (basic kit)!\n" +
        "Includes everything you need for at-home grooming—clippers, guide combs, and cleaning brush.\n" +
        "Quiet motor and sharp blades ensure a stress-free experience for your pet.\n" +
        "Ideal for trimming fur, maintaining hygiene, and reducing trips to the groomer.\n" +
        "Easy to use, safe, and suitable for dogs and cats.",
        price: "45",
        image: "/images/pet-clippers.png",
        category: "Pet supplies",
    },

    134: {
        id: 134,
        name: "Pet Nail Clippers",
        description:
        "Trim your pet’s nails safely and easily with our Pet Nail Clippers!\n" +
        "Ergonomic handles and sharp, stainless steel blades provide precise, clean cuts every time.\n" +
        "Built-in safety guard helps prevent over-cutting and injury.\n" +
        "Perfect for dogs, cats, and small animals.\n" +
        "Maintain your pet’s comfort and health with regular nail care.",
        price: "10",
        image: "/images/pet-nail-clippers.png",
        category: "Pet supplies",
    },

    135: {
        id: 135,
        name: "Pet Toothbrush and Toothpaste Kit",
        description:
        "Promote your pet’s oral health with our Pet Toothbrush and Toothpaste Kit!\n" +
        "Specially designed brush and safe, tasty toothpaste make dental care easy and effective.\n" +
        "Helps reduce plaque, tartar, and bad breath for a healthier smile.\n" +
        "Suitable for dogs and cats of all ages.\n" +
        "Make brushing a positive part of your pet’s routine.",
        price: "12",
        image: "/images/pet-toothbrush.png",
        category: "Pet supplies",
    },

    136: {
        id: 136,
        name: "Travel Pet Carrier (soft-sided)",
        description:
        "Travel in comfort and style with our soft-sided Travel Pet Carrier!\n" +
        "Lightweight yet sturdy, with mesh panels for ventilation and visibility.\n" +
        "Padded interior and secure zippers keep your pet safe and cozy on the go.\n" +
        "Perfect for trips to the vet, vacations, or everyday outings.\n" +
        "Fits under most airline seats for convenient air travel.",
        price: "40",
        image: "/images/pet-carrier.png",
        category: "Pet supplies",
    },

    137: {
        id: 137,
        name: "Car Seat Cover for Pets",
        description:
        "Protect your car's interior with our Car Seat Cover for Pets!\n" +
        "Waterproof, scratch-resistant material shields seats from fur, dirt, and spills.\n" +
        "Easy to install and remove, with adjustable straps for a secure fit.\n" +
        "Non-slip backing keeps the cover in place during rides.\n" +
        "Make every trip cleaner and more comfortable for you and your pet.",
        price: "30",
        image: "/images/pet-car-seat-cover.png",
        category: "Pet supplies",
    },

    138: {
        id: 138,
        name: "Interactive Puzzle Toys for Dogs/Cats",
        description:
        "Stimulate your pet's mind with our Interactive Puzzle Toys for Dogs and Cats!\n" +
        "Designed to challenge and entertain, these toys help reduce boredom and destructive behavior.\n" +
        "Hide treats inside to encourage problem-solving and reward play.\n" +
        "Durable, pet-safe materials for hours of fun.\n" +
        "Great for solo play or bonding time with your furry friend.",
        price: "299.99",
        image: "/images/pet-puzzle-toy.png",
        category: "Pet supplies",
    },

    // **Sports** category
    139: {
        id: 139,
        name: "Agility Ladder",
        description:
        "Take your training to the next level with our Agility Ladder!\n" +
        "Perfect for athletes of all levels, this ladder helps improve foot speed, coordination, and balance.\n" +
        "Use it for warm-ups, HIIT, or sports-specific drills—indoors or outdoors.\n" +
        "Durable, lightweight, and easy to set up, it's a must-have for soccer, football, or fitness enthusiasts.\n" +
        "Boost your agility and reaction time with every workout.",
        price: "329.99",
        image: "/images/agility-ladder.png",
        category: "Sports",
    },

    140: {
        id: 140,
        name: "Cones (set of several)",
        description:
        "Organize your drills and mark boundaries with our set of Sports Cones!\n" +
        "Brightly colored and flexible, these cones are perfect for agility training, field games, or obstacle courses.\n" +
        "Stackable and lightweight for easy transport and storage.\n" +
        "Great for coaches, athletes, and kids’ activities alike.\n" +
        "Make every practice session more dynamic and fun.",
        price: "299.99",
        image: "/images/sports-cones.png",
        category: "Sports",
    },

    141: {
        id: 141,
        name: "Pull-Up Bar (doorway mount)",
        description:
        "Build upper body strength at home with our Doorway Pull-Up Bar!\n" +
        "Easy to install and remove—no drilling required.\n" +
        "Supports multiple grip positions for pull-ups, chin-ups, and hanging leg raises.\n" +
        "Sturdy steel construction ensures safety and durability.\n" +
        "Turn any doorway into your personal gym.",
        price: "899.99",
        image: "/images/pull-up-bar.png",
        category: "Sports",
    },

    142: {
        id: 142,
        name: "Push-Up Handles",
        description:
        "Enhance your push-up routine with our ergonomic Push-Up Handles!\n" +
        "Designed to reduce wrist strain and increase range of motion for deeper, more effective reps.\n" +
        "Non-slip grips and stable base for safety on any surface.\n" +
        "Lightweight and portable—perfect for home, gym, or travel workouts.\n" +
        "Build strength and sculpt your upper body with confidence.",
        price: "239.99",
        image: "/images/push-up-handles.png",
        category: "Sports",
    },

    143: {
        id: 143,
        name: "Ankle Weights (pair)",
        description:
        "Add resistance to your workouts with our comfortable Ankle Weights!\n" +
        "Adjustable straps ensure a secure fit for walking, running, or strength training.\n" +
        "Great for toning legs, glutes, and core muscles.\n" +
        "Durable materials and even weight distribution for safe, effective exercise.\n" +
        "Level up your fitness routine—one step at a time.",
        price: "349.99",
        image: "/images/ankle-weights.png",
        category: "Sports",
    },

    144: {
        id: 144,
        name: "Wrist Weights (pair)",
        description:
        "Boost your cardio and strength workouts with our Wrist Weights!\n" +
        "Perfect for walking, aerobics, or rehabilitation exercises.\n" +
        "Soft, adjustable straps for a comfortable, secure fit.\n" +
        "Compact and easy to use—add intensity without limiting movement.\n" +
        "Ideal for all fitness levels.",
        price: "299.99",
        image: "/images/wrist-weights.png",
        category: "Sports",
    },

    145: {
        id: 145,
        name: "Stopwatch",
        description:
        "Track your performance with our easy-to-use Stopwatch!\n" +
        "Features precise timing, lap/split functions, and a clear digital display.\n" +
        "Lightweight and portable—perfect for coaches, athletes, and fitness enthusiasts.\n" +
        "Essential for interval training, races, and time-based challenges.\n" +
        "Stay on top of your goals with accurate timing.",
        price: "369.99",
        image: "/images/stopwatch.png",
        category: "Sports",
    },

    146: {
        id: 146,
        name: "Pocket Stopwatch",
        description:
        "Never miss a second with our compact Pocket Stopwatch!\n" +
        "Fits easily in your hand or pocket for on-the-go timing.\n" +
        "Simple controls and a bright display make it user-friendly for all ages.\n" +
        "Great for sports, study sessions, or daily routines.\n" +
        "Precision timing, anytime, anywhere.",
        price: "349.99",
        image: "/images/pocketstopwatch.png",
        category: "Sports",
    },

    147: {
        id: 147,
        name: "Heart Rate Monitor (basic)",
        description:
        "Monitor your heart health and optimize your workouts with our Basic Heart Rate Monitor!\n" +
        "Easy-to-read display shows real-time heart rate during exercise.\n" +
        "Comfortable, adjustable strap for secure fit during any activity.\n" +
        "Ideal for runners, cyclists, and anyone focused on fitness goals.\n" +
        "Stay in your target zone and train smarter.",
        price: "739.99",
        image: "/images/heart-rate-monitor.png",
        category: "Sports",
    },

    148: {
        id: 148,
        name: "Cycling Water Bottle Cage",
        description:
        "Stay hydrated on the go with our Cycling Water Bottle Cage!\n" +
        "Lightweight, durable design fits most standard bike bottles.\n" +
        "Easy to install on any bike frame—tools included.\n" +
        "Secure grip keeps your bottle in place on rough rides.\n" +
        "A must-have accessory for every cyclist.",
        price: "199.99",
        image: "/images/water-bottle-cage.png",
        category: "Sports",
    },

    149: {
        id: 149,
        name: "Bike Lock (basic)",
        description:
        "Protect your bike with our reliable Basic Bike Lock!\n" +
        "Strong steel cable and easy-to-use combination or key lock.\n" +
        "Lightweight and flexible for convenient carrying.\n" +
        "Ideal for quick stops, school, or city commuting.\n" +
        "Keep your ride safe and secure wherever you go.",
        price: "339.99",
        image: "/images/bike-lock.png",
        category: "Sports",
    },

    150: {
        id: 150,
        name: "Bike Lock (modular?)",
        description:
        "Upgrade your bike security with our Modular Bike Lock!\n" +
        "Innovative design allows flexible locking options for multiple bikes or gear.\n" +
        "Heavy-duty materials resist cutting and tampering.\n" +
        "Easy to transport and quick to secure.\n" +
        "Peace of mind for cyclists who demand the best.",
        price: "329.99",
        image: "/images/bike-lock.png",
        category: "Sports",
    },

    // **Books** category
    151: {
        id: 151,
        name: "To Kill a Mockingbird - Harper Lee",
        description:
        "A timeless classic of American literature, exploring themes of justice, race, and childhood in the Deep South.\n" +
        "Follow Scout Finch as she navigates a world of prejudice and moral growth.",
        price: "199.99",
        image: "/images/to-kill-a-mockingbird.png",
        category: "Books",
    },

    152: {
        id: 152,
        name: "1984 - George Orwell",
        description:
        "A chilling dystopian novel about surveillance, totalitarianism, and the fight for truth.\n" +
        "Winston Smith dares to defy Big Brother in a world where freedom is forbidden.",
        price: "179.99",
        image: "/images/1984.png",
        category: "Books",
    },

    153: {
        id: 153,
        name: "Pride and Prejudice - Jane Austen",
        description:
        "Jane Austen's beloved romantic comedy about manners, marriage, and misunderstandings in Regency England.\n" +
        "Elizabeth Bennet and Mr. Darcy's witty banter has charmed readers for generations.",
        price: "159.99",
        image: "/images/pride-and-prejudice.png",
        category: "Books",
    },

    154: {
        id: 154,
        name: "The Great Gatsby - F. Scott Fitzgerald",
        description:
        "A dazzling portrait of the Roaring Twenties and the elusive American Dream.\n" +
        "Jay Gatsby's lavish parties hide a longing for lost love and meaning.",
        price: "199.99",
        image: "/images/the-great-gatsby.png",
        category: "Books",
    },

    155: {
        id: 155,
        name: "Moby Dick- Herman Melville",
        description:
        "An epic tale of obsession and revenge on the high seas.\n" +
        "Captain Ahab's relentless pursuit of the white whale is a literary adventure like no other.",
        price: "239.99",
        image: "/images/moby-dick.png",
        category: "Books",
    },

    156: {
        id: 156,
        name: "Hamlet - William Shakespeare",
        description:
        "Shakespeares iconic tragedy of indecision, revenge, and madness.\n" +
        "Prince Hamlet seeks to avenge his father’s death in the haunted halls of Elsinore.",
        price: "139.99",
        image: "/images/hamlet.png",
        category: "Books",
    },

    157: {
        id: 157,
        name: "The Catcher in the Rye - J.D. Salinger",
        description:
        "A coming-of-age classic that captures teenage alienation and rebellion.\n" +
        "Holden Caulfield's voice remains unforgettable and deeply relatable.",
        price: "219.99",
        image: "/images/the-catcher-in-the-rye.png",
        category: "Books",
    },

    158: {
        id: 158,
        name: "One Hundred Years of Solitude - Gabriel García Márquez",
        description:
        "A magical realist masterpiece chronicling the rise and fall of the Buendía family in Macondo.\n" +
        "Written by Mr. García Márquez - Nobel Prize in Literature 1982 - this novel weaves history, myth" +
        " and the supernatural into a rich tapestry of life.\n" +
        "A sweeping saga of love, loss, and destiny.",
        price: "279.99",
        image: "/images/one-hundred-years.png",
        category: "Books",
    },

    159: {
        id: 159,
        name: "Brave New World - Aldous Huxley",
        description:
        "A visionary dystopian novel about a future society obsessed with pleasure, conformity, and control.\n" +
        "Raises questions about technology, freedom, and happiness.",
        price: "199.99",
        image: "/images/brave-new-world.png",
        category: "Books",
    },

    160: {
        id: 160,
        name: "The Adventures of Huckleberry Finn - Mark Twain",
        description:
        "Mark Twain's classic adventure down the Mississippi River.\n" +
        "A sharp satire of antebellum society and a celebration of friendship and freedom.",
        price: "179.99",
        image: "/images/huckleberry-finn.png",
        category: "Books",
    },

    161: {
        id: 161,
        name: "Jane Eyre - Charlotte Brontë",
        description:
        "A groundbreaking novel of love, independence, and resilience.\n" +
        "Jane Eyre's journey from orphan to governess is a story of courage and self-respect.",
        price: "159.99",
        image: "/images/jane-eyre.png",
        category: "Books",
    },

    162: {
        id: 162,
        name: "Wuthering Heights - Emily Brontë",
        description:
        "A dark, passionate tale of love and revenge on the Yorkshire moors.\n" +
        "Heathcliff and Catherine's doomed romance is haunting and unforgettable.",
        price: "179.99",
        image: "/images/wuthering-heights.png",
        category: "Books",
    },

    163: {
        id: 163,
        name: "Little Women - Louisa May Alcott",
        description:
        "The heartwarming story of the March sisters as they grow up during the Civil War.\n" +
        "A celebration of family, ambition, and sisterhood.",
        price: "199.99",
        image: "/images/little-women.png",
        category: "Books",
    },

    164: {
        id: 164,
        name: "The Old Man and the Sea - Ernest Hemingway",
        description:
        "Hemingway's Pulitzer Prize-winning novella about courage and endurance.\n" +
        "An aging fisherman's epic struggle with a giant marlin.",
        price: "159.99",
        image: "/images/old-man-and-the-sea.png",
        category: "Books",
    },

    165: {
        id: 165,
        name: "Animal Farm - George Orwell",
        description:
        "A satirical allegory of revolution and corruption.\n" +
        "Farm animals overthrow their human owner, only to discover that power can corrupt anyone.",
        price: "139.99",
        image: "/images/animal-farm.png",
        category: "Books",
    },

    166: {
        id: 166,
        name: "Fahrenheit 451 - Ray Bradbury",
        description:
        "A dystopian classic where books are banned and burned.\n" +
        "Guy Montag's awakening is a powerful call for freedom of thought.",
        price: "219.99",
        image: "/images/fahrenheit-451.png",
        category: "Books",
    },

    167: {
        id: 167,
        name: "Man's Search for Meaning - Viktor Frankl",
        description:
        "A profound memoir and psychological exploration of survival in Nazi concentration camps.\n" +
        "Frankl's insights on finding purpose in suffering have inspired millions.",
        price: "299.99",
        image: "/images/lord-of-the-flies.png",
        category: "Books",
    },

    168: {
        id: 168,
        name: "Beloved by Toni Morrison",
        description:
        "A powerful novel about the legacy of slavery and the haunting of memory.\n" +
        "Sethe's story is lyrical, harrowing, and unforgettable.",
        price: "239.99",
        image: "/images/beloved.png",
        category: "Books",
    },

    169: {
        id: 169,
        name: "Things Fall Apart by Chinua Achebe",
        description:
        "A landmark of African literature, chronicling the clash between tradition and change in colonial Nigeria.\n" +
        "Okonkwo's tragic fate is a universal story of pride and loss.",
        price: "199.99",
        image: "/images/things-fall-apart.png",
        category: "Books",
    },

    170: {
        id: 170,
        name: "A Passage to India by E.M. Forster",
        description:
        "A nuanced exploration of friendship, prejudice, and colonialism in British India.\n" +
        "A novel of misunderstandings and the search for connection.",
        price: "219.99",
        image: "/images/passage-to-india.png",
        category: "Books",
    },

    171: {
        id: 171,
        name: "Cien años de soledad - Gabriel García Márquez",
        description:
        "Sumérgete en la obra maestra del realismo mágico latinoamericano, y Premio Nobel de Literatura en 1982, con 'Cien años de soledad'.\n" +
        "Acompaña a la familia Buendía a lo largo de generaciones en el mítico pueblo de Macondo, donde lo extraordinario y lo cotidiano se entrelazan en una saga inolvidable.\n" +
        "Descubre amores imposibles, soledad, magia y destino en una novela que ha cautivado a millones de lectores en todo el mundo. " +
        "Un viaje literario lleno de simbolismo, pasión y la riqueza de la cultura latinoamericana.\n" +
        "'Nadie debe conocer su sentido mientras no hayan cumplido cien años'.",
        price: "259.99",
        image: "/images/cien-anos-de-soledad.png",
        category: "Books",
    },

    172: {
        id: 172,
        name: "El laberinto de la soledad - Octavio Paz",
        description:
        "Explora la identidad mexicana y la condición humana con el ensayo fundamental de Octavio Paz, 'El laberinto de la soledad'.\n" +
        "A través de un análisis profundo de la historia, la cultura y las tradiciones, Paz revela las raíces de la soledad existencial en México.\n" +
        "Un texto imprescindible para comprender la psicología colectiva y los desafíos de la modernidad.\n" +
        "Una obra que invita a la reflexión y al autoconocimiento.",
        price: "299.99",
        image: "/images/laberinto-de-la-soledad.png",
        category: "Books",
    },

    173: {
        id: 173,
        name: "Rayuela - Julio Cortázar",
        description:
        "Atrévete a vivir una experiencia literaria única con 'Rayuela', la novela revolucionaria de Julio Cortázar.\n" +
        "Sigue a Horacio Oliveira en su búsqueda existencial por París y Buenos Aires, en una historia que puede leerse de múltiples maneras.\n" +
        "Con una estructura innovadora y personajes inolvidables, Cortázar rompe las reglas de la narrativa tradicional.\n" +
        "Una obra que desafía la mente y el corazón.",
        price: "279.99",
        image: "/images/rayuela.png",
        category: "Books",
    },

    174: {
        id: 174,
        name: "La ciudad y los perros - Mario Vargas Llosa",
        description:
        "Descubre el impactante retrato de la vida militar y la adolescencia en el Peruuuu con 'La ciudad y los perros'.\n" +
        "Mario Vargas Llosa - Premio Nobel de Literatura en 2010 - narra con crudeza y realismo las experiencias de un grupo de cadetes en un colegio militar, explorando temas de poder, violencia y rebeldía.\n" +
        "Considerada el la novela que inició el 'Boom latinoamericano', es una obra esencial para entender la literatura contemporánea.\n" +
        "Una lectura que deja huella.",
        price: "239.99",
        image: "/images/ciudad-y-los-perros.png",
        category: "Books",
    },

    175: {
        id: 175,
        name: "Como agua para chocolate - Laura Esquivel",
        description:
        "Déjate envolver por la magia, el amor y la cocina en 'Como agua para chocolate'.\n" +
        "Cada capítulo es una receta y una emoción, donde Tita lucha por su libertad y su pasión en el contexto de la Revolución Mexicana.\n" +
        "Laura Esquivel combina realismo mágico, tradición y sentimientos en una novela que ha conquistado corazones en todo el mundo.\n" +
        "Una obra conmovedora.",
        price: "219.99",
        image: "/images/como-agua-para-chocolate.png",
        category: "Books",
    },

    176: {
        id: 176,
        name: "Ficciones - Jorge Luis Borges",
        description:
        "Adéntrate en los laberintos de la mente y la literatura con 'Ficciones', la célebre colección de relatos de Jorge Luis Borges.\n" +
        "Explora el infinito, los espejos, los sueños y los enigmas en cuentos que desafían la realidad y la lógica.\n" +
        "Borges redefine el cuento moderno con ingenio, erudición y una prosa inigualable.\n" +
        "Perfecto para lectores que buscan desafíos intelectuales y nuevas perspectivas.\n" +
        "Una joya imprescindible de la literatura universal.",
        price: "319.99",
        image: "/images/ficciones.png",
        category: "Books",
    },

    177: {
        id: 177,
        name: "El amor en los tiempos del cólera - Gabriel García Márquez",
        description:
        "Vive una historia de amor eterno y paciencia infinita con 'El amor en los tiempos del cólera'.\n" +
        "Florentino Ariza y Fermina Daza desafían el paso del tiempo y las adversidades en una novela llena de pasión, nostalgia y esperanza.\n" +
        "Gabriel García Márquez teje una trama rica en detalles, emociones y personajes inolvidables.\n" +
        "Una obra que emociona y enamora.",
        price: "259.99",
        image: "/images/amor-en-tiempos-del-colera.png",
        category: "Books",
    },

    178: {
        id: 178,
        name: "La casa de los espíritus - Isabel Allende",
        description:
        "Embárcate en una saga familiar llena de realismo mágico, política y pasión con 'La casa de los espíritus'.\n" +
        "Isabel Allende narra la historia de los Trueba a lo largo de generaciones, entre secretos, amores y luchas sociales en Chile.\n" +
        "Una novela que mezcla lo sobrenatural con la historia y la emoción humana.\n" +
        "Perfecta para quienes buscan relatos épicos y conmovedores.\n" +
        "Un clásico moderno de la literatura latinoamericana.",
        price: "12",
        image: "/images/casa-de-los-espiritus.png",
        category: "Books",
    },

    179: {
        id: 179,
        name: "Pedro Páramo - Juan Rulfo",
        description:
        "Sumérgete en el misterio y la atmósfera única de 'Pedro Páramo', el clásico de Juan Rulfo.\n" +
        "Acompaña a Juan Preciado en su viaje a Comala, un pueblo habitado por fantasmas y recuerdos, en busca de su padre.\n" +
        "Una novela que fusiona realidad y fantasía, explorando la soledad, la muerte y la memoria.\n" +
        "Ideal para lectores que disfrutan de historias profundas y poéticas.\n" +
        "Una obra fundamental de la literatura mexicana y universal.",
        price: "10",
        image: "/images/pedro-paramo.png",
        category: "Books",
    },

    180: {
        id: 180,
        name: "Santa - Federico Gamboa",
        description:
        "Descubre la trágica y conmovedora historia de Santa, una joven que enfrenta la adversidad en la Ciudad de México porfiriana.\n" +
        "Federico Gamboa retrata con sensibilidad y realismo los desafíos sociales y humanos de principios del siglo XX.\n" +
        "Una novela que invita a la reflexión sobre la moral, la marginación y la esperanza.\n" +
        "Perfecta para quienes buscan relatos intensos y emotivos.",
        price: "179.99",
        image: "/images/santa.png",
        category: "Books",
    },

    181: {
        id: 181,
        name: "Doña Bárbara - Rómulo Gallegos",
        description:
        "Adéntrate en los llanos venezolanos con 'Doña Bárbara', la novela icónica de Rómulo Gallegos.\n" +
        "Vive la lucha entre civilización y barbarie a través de personajes complejos y paisajes inolvidables.\n" +
        "Una historia de poder, pasión y transformación que ha marcado la literatura latinoamericana.\n" +
        "Ideal para lectores que disfrutan de aventuras, drama y reflexión social.",
        price: "219.99",
        image: "/images/dona-barbara.png",
        category: "Books",
    },

    182: {
        id: 182,
        name: "El túnel - Ernesto Sabato",
        description:
        "Sumérgete en la mente de un artista obsesionado con la verdad y la soledad en 'El túnel', el thriller psicológico de Ernesto Sabato.\n" +
        "A través de la voz de Juan Pablo Castel, explora los límites de la obsesión, la incomunicación y la locura.\n" +
        "Una novela intensa, profunda y perturbadora que invita a cuestionar la naturaleza humana.\n" +
        "Un clásico de la literatura argentina y mundial.",
        price: "199.99",
        image: "/images/el-tunel.png",
        category: "Books",
    },

    183: {
        id: 183,
        name: "Los detectives salvajes - Roberto Bolaño",
        description:
        "Embárcate en una travesía literaria monumental con 'Los detectives salvajes' de Roberto Bolaño.\n" +
        "Sigue a Arturo Belano y Ulises Lima en su búsqueda poética y existencial a través de continentes y décadas.\n" +
        "Una novela que explora la juventud, la literatura, la amistad y el sentido de la vida con una estructura innovadora y múltiples voces.\n" +
        "Una obra maestra contemporánea.",
        price: "359.99",
        image: "/images/detectives-salvajes.png",
        category: "Books",
    },

    184: {
        id: 184,
        name: "La muerte de Artemio Cruz - Carlos Fuentes",
        description:
        "Descubre la historia de México a través de la vida de Artemio Cruz, un personaje complejo y fascinante.\n" +
        "'La muerte de Artemio Cruz' es una novela polifónica que explora el poder, la memoria y la traición en un país en constante transformación.\n" +
        "Carlos Fuentes utiliza una narrativa innovadora para sumergir al lector en los recuerdos y dilemas de su protagonista.\n" +
        "Perfecta para quienes buscan literatura comprometida y reflexiva.\n" +
        "Un hito de la novela latinoamericana.",
        price: "299.99",
        image: "/images/muerte-de-artemio-cruz.png",
        category: "Books",
    },

    185: {
        id: 185,
        name: "Residencia en la tierra - Pablo Neruda",
        description:
        "Déjate cautivar por la poesía profunda y misteriosa de Pablo Neruda en 'Residencia en la tierra'.\n" +
        "Una de las obras más influyentes de la poesía hispanoamericana, donde el amor, la soledad y el asombro ante el mundo se entrelazan en versos inolvidables.\n" +
        "Ideal para amantes de la poesía y la introspección.\n" +
        "Un clásico imprescindible para cualquier biblioteca.",
        price: "199.99",
        image: "/images/residencia-en-la-tierra.png",
        category: "Books",
    },

    186: {
        id: 186,
        name: "Veinte poemas de amor y una canción desesperada - Pablo Neruda",
        description:
        "Descubre la pasión, la melancolía y la belleza del amor en la obra más famosa de Pablo Neruda.\n" +
        "'Veinte poemas de amor y una canción desesperada' reúne versos inolvidables que han emocionado a generaciones de lectores.\n" +
        "Una celebración de los sentimientos humanos en su máxima expresión.\n" +
        "Un tesoro de la poesía universal.",
        price: "199.99",
        image: "/images/veinte-poemas.png",
        category: "Books",
    },

    187: {
        id: 187,
        name: "Altazor o el viaje en paracaídas - Vicente Huidobro",
        description:
        "Acompaña a Altazor en un viaje poético y vanguardista que desafía las formas tradicionales y explora la libertad del lenguaje.\n" +
        "Vicente Huidobro crea una obra única, llena de imágenes sorprendentes y reflexiones sobre la existencia y la creatividad.\n" +
        "Ideal para lectores que buscan innovación y profundidad en la poesía.\n" +
        "Un clásico de la poesía latinoamericana.",
        price: "239.99",
        image: "/images/altazor.png",
        category: "Books",
    },

    188: {
        id: 188,
        name: "El Aleph - Jorge Luis Borges",
        description:
        "Explora el infinito, los espejos y los laberintos en 'El Aleph', la colección de relatos magistrales de Jorge Luis Borges.\n" +
        "Cada cuento es una puerta a mundos insospechados, donde la realidad y la ficción se entrelazan con maestría.\n" +
        "Borges desafía la mente y la imaginación del lector con su erudición y originalidad.\n" +
        "Una obra esencial de la narrativa universal.",
        price: "299.99",
        image: "/images/el-aleph.png",
        category: "Books",
    },

    189: {
        id: 189,
        name: "Terra Nostra - Carlos Fuentes",
        description:
        "Sumérgete en una novela monumental que recorre la historia, el mito y la identidad de Hispanoamérica.\n" +
        "En 'Terra Nostra', Carlos Fuentes mezcla fantasía, realidad y reflexión en una obra ambiciosa y deslumbrante.\n" +
        "Un viaje literario a través de siglos, culturas y personajes inolvidables.\n" +
        "Un pilar de la literatura latinoamericana contemporánea.",
        price: "339.99",
        image: "/images/terra-nostra.png",
        category: "Books",
    },

    190: {
        id: 190,
        name: "Yo el Supremo - Augusto Roa Bastos",
        description:
        "Descubre la vida y el poder absoluto del dictador paraguayo José Gaspar Rodríguez de Francia en 'Yo el Supremo'.\n" +
        "Augusto Roa Bastos ofrece una reflexión profunda sobre la soledad del mando, la historia y la política latinoamericana.\n" +
        "Una novela compleja, innovadora y esencial para comprender los dilemas del poder.\n" +
        "Un clásico imprescindible de la literatura universal.",
        price: "319.99",
        image: "/images/yo-el-supremo.png",
        category: "Books",
    },
 };

export async function GET(request, { params }) {
  const { productId } = params;
  const product = productDetails[productId];
  if (product) {
    return NextResponse.json(product);
  } else {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
}

/*
FULL ORIGINAL productDetails DATA STRUCTURE (for reference, do not remove):

const productDetails = {
  1: {
    id: 1,
    name: "Cable USB-B",
    description: "Experience seamless connectivity with our premium Cable USB-B!...",
    price: "$109.99 MXN",
    image: "/images/usb-cable.png",
    category: "Technology",
  },
  // ...
};
*/