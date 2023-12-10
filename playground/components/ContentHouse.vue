<script setup lang="ts">
</script>

<template>
    <ContentList v-slot="{ list }">
        <table border="1">
            <tr>
                <th>
                    Title
                </th>
                <th>
                    Description
                </th>
                <th>
                    Content
                </th>
            </tr>
            <tr v-for="item in list">
                <td>
                    <slot name="title" :item="item" />
                </td>
                <td>
                    <slot name="description" :item="item" />
                </td>
                <td>
                    <slot name="content" :item="item">
                        <ContentRenderer :value="item" />
                    </slot>
                </td>
            </tr>
        </table>
    </ContentList>
</template>
