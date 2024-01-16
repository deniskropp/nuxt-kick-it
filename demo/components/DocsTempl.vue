<script setup lang="ts">
const props = defineProps<{
    templ?: ReturnType<typeof useKickTemplate>
}>()
</script>

<template>
    <UPageGrid v-if="props.templ">
        <UPageCard v-for="(m, i) in props.templ.make()" :key="i" :title="m.role">
            <template #description>
                <pre>{{ m.content }}</pre>
            </template>
        </UPageCard>
    </UPageGrid>
</template>
