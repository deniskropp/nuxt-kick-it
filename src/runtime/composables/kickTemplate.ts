import { ref, type Ref } from 'vue'
import { getItemText, type Item } from '../lib/item'
import { type Message } from '../lib/message'

type KickTemplateConstant = {
    key: string
    value: string
}

type KickTemplateContextItem = Item

type KickTemplateContent = Item | string

type KickTemplateParent = KickTemplate | null

export interface KickTemplate {
    parent: Ref<KickTemplateParent>
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
export function useKickTemplate(parent: KickTemplateParent = null): KickTemplate {
    const instance = parent ?? {
        parent: ref(null),
        constants: [],
        context: [],
        contents: []
    }

    if (parent !== null) {
        instance.parent = ref(parent)
    }

    /**
     * Generate the messages from the template
     * @returns the messages
     */
    const make = (): Message[] => {
        const messages = [
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
        ]

        messages.push(...instance.context.map(e => ({
            role: `context:${e.tag ?? ''}`,
            content: getItemText(e),
        })))
        messages.push(...instance.constants.map(c => ({
            role: `const:${c.key}`,
            content: c.value,
        })))
        messages.push(...instance.contents.map(c => ({
            role: 'content',
            content: typeof c === 'string' ? c : getItemText(c),
        })))

        return messages
    }

    /**
     * Generate a single message from the template
     * @param prompt the prompt to preface the message with
     * @returns the message
     */
    const makeSingle = (prompt?: string): string => {
        const messages = make()

        //        const prompt = messages.map(m => `⫻${m.role}⫽${m.content}`).join('\n\n\n') //+ '## assistant\n'

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
