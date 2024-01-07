import { unref, type Ref } from 'vue'
import { getItemText, type Item } from '../lib/item'
import { type Message } from '../lib/message'

export type KickTemplateConstant = {
    key: string
    value: string
}

export type KickTemplateContextItem = Item

export type KickTemplateContent = Item | string

export type KickTemplateParent = KickTemplate

export interface KickTemplate {
    parent?: Ref<KickTemplateParent>
    constants: KickTemplateConstant[]
    context: KickTemplateContextItem[]
    contents: KickTemplateContent[]

    make(): Message[]
    makeSingle(prompt?: string): string
}

/**
 * A template for document driven content.
 * 
 * @param parent the parent kick template
 * @returns the kick template instance
 */
export function useKickTemplate(init?: Partial<KickTemplate>): KickTemplate {
    const instance = {
        parent: init?.parent,
        constants: init?.constants ?? [],
        context: init?.context ?? [],
        contents: init?.contents ?? [],
        make: init?.make ?? ((): Message[] => []),
        makeSingle: init?.makeSingle ?? ((prompt?: string): string => ''),
    }

    console.log({init, instance})

    /**
     * Generate the messages from the template
     * @returns the messages
     */
    const make = (): Message[] => {
        let messages: Message[] = []

        const i2m = (i: KickTemplate): Message[] => ([
            ...i.context.map(e => ({
                role: `context:${e.tag ?? ''}`,
                content: getItemText(e),
            })),
            ...i.constants.map(c => ({
                role: `const:${c.key}`,
                content: c.value,
            })),
            ...i.contents.map(c => ({
                role: 'content',
                content: typeof c === 'string' ? c : getItemText(c),
            }))
        ])

        for (let i = unref(instance.parent); i; i = unref(i.parent)) {
            messages = [...i2m(i), ...messages]
        }

        messages = [...messages, ...i2m(instance)]

        messages.unshift(
            {
                role: 'system',
                content: `This is a template for document driven content!

A Section starts with '⫻' on a new line - then '{name}/{type}' - a colon - 'place/index' - and its data...
1. 'name' being a keyword or token: ['const','content','context']
2. 'type' being optional information: format, encoding, component type
3. data as indicated
4. a few empty lines until the end of the section

Generate responses according to these rules:
1. Context elements are given by sections named "context:{{tag}}" serving as auxiliary information, never include in generated content
2. Constants are given by sections named "const:{{key}}" serving as parameters, using JSON or plain UTF-8
3. Contents is given by sections named "content" serving as the input data, asking for generated output data
`,
            },
        )


        return messages
    }

    /**
     * Generate a single message from the template
     * @param prompt the prompt to preface the message with
     * @returns the message
     */
    const makeSingle = (prompt?: string): string => {
        const messages = make()

        if (prompt !== undefined) {
            messages.push({
                role: 'user',
                content: `${prompt}`,
            })
        }

        return messages.map(m => `⫻${m.role}\n${m.content}`).join('\n\n\n\n')
    }

    return { ...instance, make, makeSingle }
}
