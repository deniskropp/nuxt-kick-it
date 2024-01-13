import nuxtKickItModule from '../src/module'

export default defineNuxtConfig({
    modules: [
        '@nuxt/content',
        nuxtKickItModule
    ],
    content: {
        documentDriven: true
    }
})
