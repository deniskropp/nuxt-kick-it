import { unref, type Ref } from 'vue'
import { getItemText, type Item } from '../lib/item'
import { type Message } from '../lib/message'

/**
 * Represents a constant used in a KickTemplate.
 * @property key - The key of the constant.
 * @property value - The value of the constant.
 */
export type KickTemplateConstant = {
    key: string
    value: string
}

/**
 * Represents an item in the context of a KickTemplate.
 * It can be either an Item or a string.
 */
export type KickTemplateContextItem = Item | string

/**
 * Represents the content of a KickTemplate.
 * It can be either an Item or a string.
 */
export type KickTemplateContent = Item | string

/**
 * Represents the parent KickTemplate of a KickTemplate.
 */
export type KickTemplateParent = KickTemplate

/**
 * Interface for a KickTemplate.
 */
export interface KickTemplate {
    /**
     * The parent KickTemplate.
     */
    parent?: Ref<KickTemplateParent>
    /**
     * The constants used in the KickTemplate.
     */
    constants: KickTemplateConstant[]
    /**
     * The context items used in the KickTemplate.
     */
    context: KickTemplateContextItem[]
    /**
     * The contents of the KickTemplate.
     */
    contents: KickTemplateContent[]

    /**
     * Generate the messages from the template.
     * @returns The messages generated from the template.
     */
    make(): Message[]

    /**
     * Generate a single message from the template.
     * @param prompt - The prompt to preface the message with.
     * @returns The generated message.
     */
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

    /**
     * Generate the messages from the template
     * @returns the messages
     */
    const make = (): Message[] => {
        let messages: Message[] = []

        const i2m = (i: KickTemplate): Message[] => ([
            ...i.context.map(e => ({
                role: `context:${e.tag ?? ''}`,
                content: typeof e === 'string' ? e : getItemText(e),
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
                content: `Generate markdown content according to these rules:
1. Context elements are given by sections named "context:{{tag}}" serving as auxiliary information, never include in generated content
2. Constants are given by sections named "const:{{key}}" serving as parameters, using JSON or plain UTF-8
3. Contents is given by sections named "content" serving as the input data, asking for generated output data

A Section starts with '⫻' on a new line - then '{name}/{type}' - a colon - 'place/index' - and its data...
1. 'name' being a keyword or token: ['const','content','context']
2. 'type' being optional information: format, encoding, component type
3. data as indicated
4. a few empty lines until the end of the section
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
