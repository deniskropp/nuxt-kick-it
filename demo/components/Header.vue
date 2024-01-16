<script setup lang="ts">
const { header } = useAppConfig()
const statuss = [
    useStatus(),
    useStatus('status2', () => ({ label: 'Second', color: 'primary' })),
]
const poll = useTimeoutPoll(() => statuss[1].update({
    color: statuss[1].status.value.color === 'gray' ? 'white' : 'gray',
}), 250, { immediate: true })

watch(statuss, () => {
    // Logic to execute when statuss array changes
    console.log(statuss)
}, { deep: true })

</script>

<template>
    <UHeader>
        <template #logo>
            <template v-if="header?.logo?.dark || header?.logo?.light">
                <UColorModeImage v-bind="{ class: 'h-6 w-auto', ...header?.logo }" />
            </template>
            <template v-else>
                Nuxt Kick It
                <UBadge label="Docs" variant="subtle" class="mb-0.5" />
            </template>
        </template>

        <template v-if="header?.search" #center>
            <UDocsSearchButton class="hidden lg:flex" />

            <UPopover v-for="({ status: status }, index) in statuss" :key="index" mode="hover">
                <UBadge :label="status.value.label" :color="status.value.color" variant="subtle" class="mb-0.5">
                    <UButton variant="ghost" @click="poll.pause()">x</UButton>
                </UBadge>

                <template #panel>
                    <slot name="status" v-bind="{ status }">
                        <UTable
                            :rows="Object.entries(status.value).slice(2).map(([key, value])=>({key, value}))"
                            :columns="[{ key: 'key', label: '🖤' }, { key: 'value', label: '🩶' }]"
                        >
                            <template #key-data="{ row }">
                                <span class="font-bold">{{ row.key }}</span>
                            </template>
                        </UTable>
                    </slot>
                </template>
            </UPopover>
        </template>

        <template #right>
            <UDocsSearchButton v-if="header?.search" :label="null" class="lg:hidden" />

            <UColorModeButton v-if="header?.colorMode" />

            <template v-if="header?.links">
                <UButton
                    v-for="(link, index) of header.links" :key="index"
                    v-bind="{ color: 'gray', variant: 'ghost', ...link }"
                />
            </template>
        </template>
    </UHeader>
</template>
