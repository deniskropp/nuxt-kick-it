export default defineNuxtConfig({
    modules: [
        '@nuxt/content',
        '../../../src/module'
    ],
    content: {
        documentDriven: true
    }
})
