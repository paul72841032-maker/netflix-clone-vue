/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,ts,tsx,js,jsx}'],
    theme: {
        extend: {
            colors: { brand: { 500: '#e50914', 600: '#c11119' } },
            boxShadow: { glow: '0 10px 30px rgba(229,9,20,.25)' },
        },
    },
    plugins: [],
}
