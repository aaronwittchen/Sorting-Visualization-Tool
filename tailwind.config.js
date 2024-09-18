// https://tailwindcss.com/docs/content-configuration

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                'purple-light': '#7d59b6',
                'carbon': '#362d3d',
                'carbon-light': '#4b4453',
                'white-light': '#ecf0f1'
            },
            // padding: {
                // 1.5': '0.375rem', // Add a custom padding value
            //  }
        },
    },

    safelist: ["bg-teal-800", "bg-amber-500", "bg-rose-500"], // Safelisting classes
    plugins: [],
};
