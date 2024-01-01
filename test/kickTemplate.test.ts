import { ref, type Ref } from 'vue'
import { describe, expect, test } from 'vitest'
import { type KickTemplate, type KickTemplateParent, useKickTemplate } from '../src/runtime/composables/kickTemplate'

describe('make', () => {
    test('should return an array of messages', () => {
        const template: KickTemplate = useKickTemplate({
            context: [{ type: 'text', tag: 'test', value: 'test' }],
            contents: ['test'],
        })
        const messages = template.make()
        expect(messages).toEqual([
            { role: 'system', content: messages[0].content },
            { role: 'context:test', content: 'test' },
            { role: 'content', content: 'test' },
        ])
    })

    test('should return an empty array if no context or contents are provided', () => {
        const template: KickTemplate = useKickTemplate()
        const messages = template.make()
        expect(messages).toEqual([
            { role: 'system', content: messages[0].content },
        ])
    })

    test('should return two contexts', () => {
        const root: KickTemplate = useKickTemplate({
            context: [{
                type: 'text',
                tag: 'root',
                value: 'Contextual Information at the root'
            }]
        })
        const template: KickTemplate = useKickTemplate({
            parent: ref(root),
            context: [{
                type: 'text',
                tag: 'h1',
                value: 'Head Line'
            }]
        })
        const messages = template.make()
        expect(messages).toEqual([
            { role: 'system', content: messages[0].content },
            { role: 'context:root', content: 'Contextual Information at the root' },
            { role: 'context:h1', content: 'Head Line' },
        ])
    })
})

describe('makeSingle', () => {
    test('should return a string with the messages concatenated', () => {
        const template: KickTemplate = useKickTemplate({
            context: [{ type: 'text', tag: 'test', value: 'test' }],
            contents: ['test'],
        })
        const message = template.makeSingle()
        expect(message).toEqual(`⫻system
${template.make()[0].content}



⫻context:test
test



⫻content
test`)
    })

    test('should return a string with the prompt concatenated if provided', () => {
        const template: KickTemplate = useKickTemplate({
            context: [{ type: 'text', tag: 'test', value: 'test' }],
            contents: ['test'],
        })
        const message = template.makeSingle('prompt')
        expect(message).toEqual(`⫻system
${template.make()[0].content}



⫻context:test
test



⫻content
test



⫻user
prompt`)
    })
})
