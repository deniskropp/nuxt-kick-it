export default defineNuxtConfig({
    modules: ['@nuxt/content', '../src/module'],
    nuxtKickIt: {},
    devtools: { enabled: false },
    content: {
        documentDriven: true
    }
})
