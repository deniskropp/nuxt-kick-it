<script setup>
defineProps({
    item: {
        type: Object,
        default: () => {}
    },
    depth: {
        type: Number,
        default: () => 5
    }
})
</script>

<template>
    <ul>
        <TocLink
            v-for="child of item?.links"
            :key="child.id"
            :link="child"
            :depth="depth"
        />
    </ul>
</template>
