export default defineNuxtConfig({
    modules: [
        '@nuxt/content',
        '../../../src/module'
    ],
    devtools: { enabled: false },
    content: {
        documentDriven: true
    },
})
