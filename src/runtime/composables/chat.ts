import { getItemText, type Item } from '../lib/item'
import type { Message } from '../lib/message'

import { kickIt } from '../lib/kick'
import { useInfo } from './info'

/**
 * Generates markdown based on a set of rules and input data.
 * 
 * @param constants - An optional object containing key-value pairs of constants to be used in the markdown generation.
 * @returns An object with two properties: `messages` - An array of `Message` objects representing the context, constants, and chats, and `generate` - A function that generates markdown based on the provided messages and an optional kick API endpoint.
 */
export function useChat(constants?: any) {
    const { page } = useContent()
    const { body } = unref(page)

    const elements = body.children.filter((c: any) => c.tag !== 'chat' && c.tag !== 'test-chat')
    const chats = body.children.filter((c: any) => c.tag === 'chat')
    const entries = Object.entries(constants).filter(e => e[1])

    const messages: Message[] = [
        {
            role: 'system',
            content: `This is a template to generate markdown according to these rules:
- Context elements are given by "context:{tag}" serving as auxiliary information, not to be included in the response
- Constants are given by "user:{key}" serving as parameters
- Contents is given by "user" serving as the input data, asking for generated output data
`
        },
        ...elements.map((e: Item) => ({
            role: `context:${e.tag ?? ''}`,
            content: getItemText(e)
        })),
        ...entries.map(([key, value]) => ({
            role: `user:${key}`,
            content: value
        })),
        ...chats.map((c: Item) => ({
            role: `user`,
            content: getItemText(c)
        })),
    ]

    return {
        messages,
        generate
    }

    /**
     * Generates markdown based on the provided messages and an optional kick API endpoint.
     * 
     * @param messages - An array of `Message` objects representing the context, constants, and chats.
     * @param kick_api - An optional string representing the kick API endpoint.
     * @returns A string representing the generated markdown.
     */
    async function generate(messages: Message[], kick_api?: string) {
        const { data } = await useAsyncData('kick', async () => {
            const info = await useInfo()

            return kickIt(kick_api ?? '/ai', 'chat', {
                messages: [
                    { role: 'system', content: 'GENERATE MARKDOWN USING TEMPLATE WITH FOLLOWING INFORMATION' },
                    ...info.map(i => ({
                        role: i._content._id,
                        content: `${i.title}\n${i.text}`
                    })),
                    ...messages,
                ]
            })
        })

        if (!data.value)
            throw new Error('no data')

        return (
            data.value.type === 'error' ? data.value.what :
                data.value.type === 'chat' ? data.value.messages[data.value.messages.length - 1].content :
                    data.value.type
        )
    }
}
