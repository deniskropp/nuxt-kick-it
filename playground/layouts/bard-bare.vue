<script lang="ts" setup>
import { type Ref, ref, unref } from 'vue'
import { getItemText, type Item } from '../../src/runtime/lib/item'
import { type Message } from '../../src/runtime/lib/message'
import { type KickTemplate, useKickTemplate } from '../../src/runtime/composables/kickTemplate'

import BardieTS from 'bardie-ts'

const bard = new BardieTS()

const prompt = ref('generate')
const single = ref('')
const generated = ref('')
const pending = ref(false)


function fromContent(constants: object = {}, content?: any) {
    const { page,  } = content ?? useContent()
    const { body } = unref(page)

    const elements = body.children.filter((c: Item) => c.tag !== 'pre' && c.tag !== 'test-chat')
    const chats = body.children.filter((c: Item) => c.tag === 'pre')
    const entries = Object.entries(constants).filter(e => e[1])

    const ret = {
//        constants: entries.map(e => ({ key: e[0], value: JSON.stringify(e[1]) })),
        context: elements,
        contents: chats
    }

    console.log(ret)
    
    return ret
}

const root = useKickTemplate()

root.constants.push({ key: 'name', value: 'Denis Oliver Kropp' })

const templ = useKickTemplate({
    ...root,
    ...fromContent()
})

async function gen2() {
    try {
        pending.value = true

        single.value = templ.makeSingle()//prompt.value)

        const ask = single.value
        const response = await bard.question({ask})

        console.log(`User: \`${ask}\n\``)
        console.log(`Bard: \`${response.content}\n\``)

        generated.value = `${response.content}`
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
