<script setup>
import { CohereClient } from 'cohere-ai'

const cohere = new CohereClient({
    token: 'I8aW6BTLwODZgdRTZW3TSAvMA6phiqDujCwKOGj1', // This is your trial API key
});

(async () => {
    const stream = await cohere.chatStream({
        model: 'command',
        message: 'OK',
        chatHistory: [{'role': 'User', 'message': 'I’m interested in learning more about AI startups focused on productivity. Give me a summary of the top 3.'}, {'role': 'Chatbot', 'message': 'Here are three AI startups focused on productivity that utilise Large Language Models (LLMs):\n\n1. SheetCopilot: This startup aims to bring software productivity to the next level through LLMs. SheetCopilot utilises LLMs to complete daily tasks like tabular data processing and project timeline scheduling. These tasks are usually repetitive and error-prone. SheetCopilot proposes a SheetCopilot agent, which takes natural language task requests and combines it with a control spreadsheet to fulfil the requirements.\n2. Uber: Although not an AI startup in the traditional sense, Uber utilises AI to enhance the sample efficiency for deep RL algorithms. By reducing reliance on human supervision, Uber can automate and scale up the process of ride-sharing, thus increasing productivity.\n3. Cohere: This AI startup provides an interface for users to create and interact with large language models in order to complete tasks like generating text for blogs or emails, or even for coding.'}],
        promptTruncation: 'AUTO',
        citationQuality: 'accurate',
        connectors: [{'id':'neurips'}],
        documents: []
    })

    for await (const chat of stream) {
        if (chat.eventType === 'text-generation') {
            process.stdout.write(chat.text)
        }
    }
})

const { markdown, pending, ask, messages, generate } = useKick()
</script>

<template>
    <slot />

    <pre v-for="(message, index) in messages" :key="index">{{ message.content }}</pre>
</template>
