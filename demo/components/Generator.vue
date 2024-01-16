<script setup lang="ts">
interface GeneratorProps {
    prompt?: string,
    content?: string
}

const generatorProps = defineProps<GeneratorProps>()
const prompt = toRef(generatorProps, 'prompt')
const content = toRef(generatorProps, 'content')

watch([prompt, content], () => {
    // Update the templ and single variables here
    updateTemplate()
})

const single = ref('')

async function updateTemplate() {
    const route = useRoute()

    const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())

    const templ = useKickTemplate({
        context: [page.value.body],
        contents: [content.value ?? ''],
    })

    single.value = templ.makeSingle(prompt.value === '' ? undefined : prompt.value)
}

await updateTemplate()


const pending = ref(false)
const generated = ref('')

/**
 * Generates a response using Bard.
 *
 * @return {undefined} No return value.
 */
async function generate() {
    // Set the `pending` variable to `true` to indicate that the generation process is pending
    pending.value = true

    try {
        // Get an instance of the Bard service
        const bard = useBard()

        // Ask a question to the Bard service and wait for the response
        const response = await bard.question({ ask: single.value })

        // Set the `generated` variable to the content of the response
        generated.value = response.content
    }
    catch (e) {
        // Log the error to the console
        console.error(e)

        // Set the `generated` variable to an error message
        generated.value = '```\nError: ' + e
    }
    finally {
        // Set the `pending` variable to `false` to indicate that the generation process is no longer pending
        pending.value = false
    }
}
</script>

<template>
    <UContainer>
        <slot />

        <UDivider />

        <UButton :disabled="pending" @click="generate">
            <slot name="button">
                Generate
            </slot>
        </UButton>

        <UDivider />

        <MDC v-if="generated" :value="generated" class="prose prose-primary dark:prose-invert" />

        <UDivider />

        <UAccordion :items="[{ label: 'Prompt (generated)', content: single }]">
            <template #item="{ item }">
                <pre class="prose prose-primary dark:prose-invert mx-auto">{{ item.content }}</pre>
            </template>
        </UAccordion>
    </UContainer>
</template>
