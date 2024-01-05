/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            screens: {
                "sm": { "max": "450px" },
                "md": { "max": "768px" },
                "lg": { "max": "1024px" },
                "xl": { "max": "1366px" },
                "2xl": { "max": "1920px" }
            }
        },
    },
    plugins: [],
}

