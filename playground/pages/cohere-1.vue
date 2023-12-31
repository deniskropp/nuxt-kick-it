<script lang="ts" setup>
import { CohereClient } from 'cohere-ai'
import { ref } from 'vue'

const cohere = new CohereClient({
    token: 'I8aW6BTLwODZgdRTZW3TSAvMA6phiqDujCwKOGj1', // This is your trial API key
})

const prompt = ref(JSON.stringify(useContent().page.value))
const resp = ref('')


async function gen() {
    const response = await cohere.generate({
        model: 'command',
        prompt: prompt.value,
        maxTokens: 1000,
        temperature: 5.0,
        k: 0,
        stopSequences: [],
        returnLikelihoods: 'NONE'
    })
    console.log(`Prediction: ${response.generations[0].text}`)
    resp.value = response.generations[0].text
}

const pc = ref('/')

</script>

<template>
    <input v-model="prompt" />
    <button @click="gen()">Gen</button>
    <hr>
    <NuxtLayout name="cohere">
        <ContentDoc :path="pc" />

    </NuxtLayout>
    <hr>
    <p v-html="prompt"></p>
    <MDC :value="markdown"></MDC>
</template>
