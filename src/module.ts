import { defineNuxtModule, addComponentsDir, addImportsDir, addPlugin, createResolver, addLayout } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
    api_base: string
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: 'nuxt-kick-it',
        configKey: 'nuxtKickIt'
    },
    // Default configuration options of the Nuxt module
    defaults: {
        api_base: 'https://kick.violass.club'
    },
    async setup(options, nuxt) {
        const { resolve } = createResolver(import.meta.url)

        const runtimeDir = resolve('./runtime')


        // Plugins

        addPlugin({
            src: resolve(runtimeDir, 'plugin')
        })


        // Components

        await addComponentsDir({
            path: resolve(runtimeDir, 'components', 'content'),
            pathPrefix: false,
            prefix: '',
            global: true,
            watch: false
        })

        await addComponentsDir({
            path: resolve(runtimeDir, 'components'),
            pathPrefix: false,
            prefix: '',
            global: false,
            watch: false
        })


        // Composables

        addImportsDir([
            resolve(runtimeDir, 'composables')
        ])

        addImportsDir([
            resolve(runtimeDir, 'lib')
        ])


        // Layouts

        addLayout({src: resolve(runtimeDir, 'layouts', 'default.vue')})
    }
})
