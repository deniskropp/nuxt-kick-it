<script setup lang="ts">
const prompt = ref('')
const content = ref('{{context:short}}')
</script>

<template>
    <Generator :prompt="prompt" :content="content">
        <UFormGroup label="Content">
            <UTextarea v-model="content" />
        </UFormGroup>
        <UFormGroup label="User">
            <UInput v-model="prompt" placeholder="optional user prompt" />
        </UFormGroup>
    </Generator>
</template>
