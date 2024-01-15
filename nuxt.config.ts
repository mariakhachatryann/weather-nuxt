// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@invictus.codes/nuxt-vuetify"],
    css: ['~/assets/css/main.css'],
    devtools: { enabled: true },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    vuetify: {
        moduleOptions: {
            styles: 'none',
            autoImport: false,
            useVuetifyLabs: false,
        }
    }
})
