import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

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

        console.log('nuxt-kick-it module setup...')

        // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
        addPlugin(resolver.resolve('./runtime/plugin'))


        // Add `components/` directory to the Nuxt application
        nuxt.hook('components:dirs', (dirs) => {
            dirs.push({
                path: resolver.resolve('./runtime/components'),
                prefix: 'kick'
            })
        })
    }
})
