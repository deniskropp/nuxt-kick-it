<script setup lang="ts">
import { ref } from 'vue'
import { useKickTemplate } from '../src/runtime/composables/kickTemplate'

const context = ref('')
const content = ref('')
const output = ref('')

function make() {
    try {
        const templ = useKickTemplate({
            context: [{
                type: 'text',
                tag: '',
                value: context.value
            }],
            contents: [content.value],
        })

        output.value = templ.makeSingle()
    }
    catch (e) {
        output.value = e
    }
}
</script>

<template>
    <div>
        <table>
            <tr>
                <td>
                    Context
                </td>
                <td>
                    <textarea v-model="context" />
                </td>
            </tr>
            <tr>
                <td>
                    Content
                </td>
                <td>
                    <textarea v-model="content" />
                </td>
            </tr>
        </table>
        <hr>
        <button @click="make">
            Make
        </button>
        <hr>
        <pre>{{ output }}</pre>
    </div>
</template>