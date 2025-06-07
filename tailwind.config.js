// Código por - Joaquín Saldarriaga
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}", // Include all files in the src directory
    ],
    theme: {
        extend: {
            colors: {
                blue: {
                    100: "#E3F2FD",
                    500: "#2196F3",
                },
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"], // Example font
            },
        },
    },
    plugins: [],
};