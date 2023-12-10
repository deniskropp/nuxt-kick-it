<script setup>
defineProps({
    link: {
        type: Object,
        default: () => { }
    },
    depth: {
        type: Number,
        default: () => 5
    }
})
</script>

<template>
    <li v-if="link?.depth <= depth">
        <div>{{ link.text }}</div>
        <ul v-if="link?.depth < depth">
            <TocLink
                v-for="child of link.children"
                :key="child.id"
                :link="child"
                :depth="depth"
            />
        </ul>
    </li>
</template>
