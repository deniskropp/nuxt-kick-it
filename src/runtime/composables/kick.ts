import { ref, useChat } from '#imports'

export function useKick(constants: any) {
    const { messages, generate } = useChat(constants)

    const markdown = ref('')
    const pending = ref(false)

    const ask = () => {
        async function run() {
            pending.value = true

            markdown.value = await generate(messages)

            pending.value = false
        }

        run()
    }

    return {
        markdown,
        pending,
        ask,
        messages,
        generate
    }
}
