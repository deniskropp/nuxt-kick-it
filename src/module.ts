import { defineNuxtModule, addPlugin, createResolver, addComponent } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions { }

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: 'nuxt-kick-it',
        configKey: 'nuxtKickIt'
    },
    // Default configuration options of the Nuxt module
    defaults: {},
    setup(options, nuxt) {
        const resolver = createResolver(import.meta.url)

        // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
        addPlugin(resolver.resolve('./runtime/plugin'))
        addComponent({
            name: 'Chat',
            filePath: './runtime/components/content/Chat.vue'
        })
    }
})
