/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{html,js,jsx}"],
    important: true,
    theme: {
        extend: {
            fontFamily: {
                bebas: ["Bebas Neue", "sans-serif"],
                quantico: ["Quantico", "sans-serif"],
                jetbrains: ["JetBrains Mono", "monospace"],
            },
            colors: {
                binus: "#0099da",
            },
        },
    },
    plugins: [],
};
