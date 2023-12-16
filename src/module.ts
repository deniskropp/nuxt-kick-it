import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import { join } from 'path'
import { fileURLToPath } from 'url'

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
    setup(options, nuxt) {
        const resolver = createResolver(import.meta.url)

        console.log('nuxt-kick-it module setup...')
        console.log('    options:', options)
        console.log('    nuxt:', nuxt)

        // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
        const plugin = addPlugin(resolver.resolve('./runtime/plugin'))

        console.log('    plugin:', plugin)


        const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

        // Register composables
        nuxt.hook('nitro:config', (nitroConfig) => {
            if (!nitroConfig.imports) {
                nitroConfig.imports = {
                    imports: [],
                }
            }
            nitroConfig.imports.imports.push({
                name: 'useKick',
                as: 'useKick',
                from: join(runtimeDir, 'composables/kick'),
            })
        })

        // Register components
        nuxt.hook('components:dirs', (dirs) => {
            dirs.push({
                path: join(runtimeDir, 'components'),
                pattern: '**/*.vue',
                pathPrefix: false,
            })
        })
    }
})
