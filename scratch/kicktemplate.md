```context:layout.vue
<script lang="ts" setup>
import { Cohere, CohereClient } from 'cohere-ai'
import { type Ref, ref, unref } from 'vue'
import { getItemText, type Item } from '../../src/runtime/lib/item'
import { type Message } from '../../src/runtime/lib/message'

const cohere = new CohereClient({
    token: 'cvF45owW4yFDUvrtrvthfdwiojEePK62b2JvGmUn', // This is your trial API key
})

const prompt = ref('generate')
const single = ref('')
const generated = ref('')
const pending = ref(false)

type KickTemplateConstant = {
    key: string,
    value: string,
}

type KickTemplateContextItem = Item

type KickTemplateContent = Item | string

interface KickTemplate {
    parent: Ref<KickTemplate | null>,
    constants: KickTemplateConstant[]
    context: KickTemplateContextItem[]
    contents: KickTemplateContent[]

    make(): Message[]
    makeSingle(prompt?: string): string
    chatHistory()

    [key: string]: object
}

function useKickTemplate(template?: KickTemplate) {
    const instance = template ?? {
        parent: ref(null),
        constants: [],
        context: [],
        contents: [],
    }

    return {
        ...instance,
        make,
        makeSingle,
        chatHistory,
    }


    function make(): Message[] {
        const messages = [
            {
                role: 'system',
                content: `This is a template to generate markdown according to these rules:
- Context elements are given by "context:{{tag}}" serving as auxiliary information, never include in generated content
- Constants are given by "const:{{key}}" serving as parameters
- Contents is given by "content" serving as the input data, asking for generated output data
`
            },
            ...instance.context.map(e => ({
                role: `context:${e.tag ?? ''}`,
                content: getItemText(e)
            })),
            ...instance.constants.map(c => ({
                role: `const:${c.key}`,
                content: c.value
            })),
            ...instance.contents.map(c => ({
                role: 'content',
                content: typeof c === 'string' ? c : getItemText(c)
            })),
        ]

        return messages
    }

    function makeSingle(prompt?: string): string {
        const messages = make()

        return messages.map(m => `\`\`\`${m.role}\n${m.content}`).join('\n\n\n\n') + '\n\n"""\n\n\n\n' + prompt ?? 'generate'
    }

    function chatHistory() {
        const messages = make()

        return messages.map(m => ({
            userName: m.role,
            role: Cohere.ChatMessageRole.User,
            message: m.content
        }))
    }
}

function fromContent(constants: object = {}, content?: any): KickTemplate {
    const { page } = content ?? useContent()
    const { body } = unref(page)

    const elements = body.children.filter((c: Item) => c.tag !== 'chat' && c.tag !== 'test-chat')
    const chats = body.children.filter((c: Item) => c.tag === 'chat')
    const entries = Object.entries(constants).filter(e => e[1])

    return {
        parent: ref(null),
        constants: entries.map(e => ({ key: e[0], value: JSON.stringify(e[1]) })),
        context: elements,
        contents: chats,
        make: () => [],
        makeSingle: () => '',
        chatHistory: () => []
    }
}

const templ = useKickTemplate(fromContent())

async function gen2() {
    try {
        pending.value = true

        single.value = templ.makeSingle(prompt.value)

        const response = await cohere.chat({
            model: 'command',
            temperature: 0.0,
            message: prompt.value,
            chatHistory: templ.chatHistory(),
        })

        console.log(`Prediction: \`${response.text}\n\``)

        generated.value = `# G

${response.text}`
    }
    finally {
        pending.value = false
    }
}
</script>

<template>
    <div>
        Layout: cohere
        <hr>
        <slot />
        <hr>
        <pre>{{ single }}</pre>
        <hr>
        <input v-model="prompt">
        <button :disabled="pending" @click="gen2()">
            Gen
        </button>
        <hr>
        <pre>{{ generated }}</pre>
        <hr>
        <MDC :value="generated" />
    </div>
</template>
```

