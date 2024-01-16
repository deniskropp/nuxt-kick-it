<script setup lang="ts">
import { ref, unref } from 'vue'
import { useKickTemplate, type KickTemplate } from '../src/runtime/composables/kickTemplate'
import BardieTS from 'bardie-ts'
import { CohereClient } from 'cohere-ai'
import { GenerateRequestTruncate } from 'cohere-ai/api/types'
import type { Message } from '../src/runtime/lib/message'
//import { useContent } from '@nuxt/content/dist/runtime/composables/content'
import type { NavItem } from '@nuxt/content/dist/runtime/types'







const {
    globals,
    navigation,
    page,
    toc
} = useContent()

const systemvals = Object.entries<any>(globals).filter(([k, v]) => !k.startsWith('_'))

const systempl = useKickTemplate({
    constants: systemvals.map(([k, v]) => ({ key: k, value: JSON.stringify(v) })),
    contents: ['**System**\n\n']
})

const templ = useKickTemplate({
    parent: ref(systempl),
    context: navigation.value.map((p: NavItem) => ({
        type: 'text', tag: p._path, value: p.title, children: p.children?.map(c => ({
            type: 'text', tag: c._path, value: `- ${c.title}`
        }))
    })),
    //contents: [content.value],
/*            context: p.body.children.map(c => ({
        type: 'text',
        tag: c.tag,
        value: JSON.stringify(c)
    }))*/
//            contents: p.body.children.map(c => JSON.stringify(c))
    contents: [page.value.body.children.map(c => JSON.stringify(c)).join('\n')]
    //contents: [JSON.stringify(p.body)]
})


const messages = ref<Message[]>([])
const generated = ref('')
const debug = ref('**Debug**\n\n')

/**
 * This function calls the `make` method of the `templ` object and assigns the result to the `messages` variable.
 * If an error occurs, it assigns an error message to the `messages` variable.
 */
function make() {
    // Try to call the `make` method of the `templ` object
    try {
        // Assign the result of the `make` method to the `messages` variable
        messages.value = templ.make()
    }
    // Catch any errors that occur during the execution of the `make` method
    catch (e: any) {
        // Assign an error message to the `messages` variable
        messages.value = [{
            role: 'error',
            content: e.toString()
        }]
    }
}

/**
 * Generates a BardieTS instance and asks a question using the provided KickTemplate.
 *
 * @param {KickTemplate} templ - The KickTemplate to use for generating the question.
 * @return {Promise<string>} The content of the result of the question.
 */
async function useBard(templ: KickTemplate) {
    // Create a new instance of BardieTS
    const bard = new BardieTS()

    // Generate a question using the provided KickTemplate
    const question = templ.makeSingle().slice(8)

    // Create a request object with the necessary parameters for generating text
    const req = {ask: question}

    // Append the request object to the debug value for debugging purposes
    debug.value += `Request\n\n\`\`\`json\n${JSON.stringify(req, null, 2)}\n\`\`\``

    // Ask the question using the BardieTS instance and wait for the result
    const result = await bard.question(req)

    // Return the content of the result
    return result.content
}

/**
 * Generates text using the Cohere API with the provided KickTemplate.
 *
 * @param {KickTemplate} templ - The KickTemplate object used to generate the question.
 * @return {Promise<string>} The generated text.
 */
async function useCohere(templ: KickTemplate) {
    // Create a new instance of Cohere with the provided API token
    const cohere = new CohereClient({
        token: 'MDA9WUoe1dXsdhH3M9XkVo5wdxS3FXLwHfn8LhDg'
    })

    // Generate a question using the provided KickTemplate
    const question = templ.makeSingle().slice(8)

    // Create a request object with the necessary parameters for generating text
    const req = {
        model: 'command', // specify the model to use for text generation
        temperature: 0.0, // set the temperature to control the randomness of the generated text
        k: 0, // set the value for top-k sampling
        p: 0.75, // set the value for nucleus sampling
        truncate: GenerateRequestTruncate.End, // specify where to truncate the generated text
        frequencyPenalty: 0, // set the frequency penalty
        presencePenalty: 0, // set the presence penalty
        prompt: question // provide the question as the prompt for text generation
    }

    // Append the request object to the debug value for debugging purposes
    debug.value += `Request\n\n\`\`\`json\n${JSON.stringify(req, null, 2)}\n\`\`\``

    // Generate text using the Cohere API with the request object
    const result = await cohere.generate(req)

    // Return the generated text
    return result.generations[0].text
}

/**
 * Generate function
 *
 * This function generates something using the provided template.
 *
 * @return {Promise<void>} - A promise that resolves when the generation is complete.
 */
async function generate() {
    try {
        // Use the Cohere library to generate the value
        generated.value = await useCohere(templ)
    }
    catch (e: any) {
        // If an error occurs, assign the error message to the generated value
        generated.value = e.toString()
    }
}
</script>

<template>
    <div>
        <ContentNavigation />
        <hr>
        <ContentRenderer :value="page" />
        <hr>
        <button @click="make">
            Make
        </button>
        <MDC v-for="(m,i) in messages" :key="i" :value="`///${m.role}\n\`\`\`\n${m.content}`" />
        <hr>
        <button @click="generate">
            Generate
        </button>
        <MDC :value="generated" />
        <hr>
        <MDC :value="`Generated content\n\n\`\`\`markdown\n${generated}\n\`\`\``" />
        <pre>{{ generated }}</pre>
        <hr>
        <MDC :value="debug" />
    </div>
</template>