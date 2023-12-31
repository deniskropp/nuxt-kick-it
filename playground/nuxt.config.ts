export default defineNuxtConfig({
    modules: ['@nuxt/content', '../src/module'],
    nuxtKickIt: {},
    devtools: { enabled: true },
    content: {
        documentDriven: true
    }
})
