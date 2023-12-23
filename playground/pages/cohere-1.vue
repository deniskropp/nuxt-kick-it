<script setup>
import { CohereClient } from 'cohere-ai'

const cohere = new CohereClient({
    token: 'I8aW6BTLwODZgdRTZW3TSAvMA6phiqDujCwKOGj1', // This is your trial API key
});

(async () => {
    const response = await cohere.generate({
        model: 'command',
        prompt: '{prompt}',
        maxTokens: 300,
        temperature: 0.9,
        k: 0,
        stopSequences: [],
        returnLikelihoods: 'NONE'
    })
    console.log(`Prediction: ${response.generations[0].text}`)
})()
</script>

<template>
    <cohere-2>
        
    </cohere-2>
</template>
