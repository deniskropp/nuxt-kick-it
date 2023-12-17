<script lang="ts" setup>
import { queryInfo } from '#imports'
import { getItemText } from '#imports'

const params = queryInfo().params()
</script>

<template>
    <div>
        <div
            class="max-w-2xl px-4 py-10 m-auto bg-white sm:px-8 sm:shadow dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 sm:rounded-lg">
            <main
                class="max-w-none prose dark:prose-invert prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 hover:prose-a:text-primary-400 prose-a:font-normal prose-a:no-underline prose-a:border-dashed prose-a:border-b hover:prose-a:border-solid hover:prose-a:border-primary-400">
                <slot />
            </main>
        </div>
        <div class="py-10" />
        <ContentList
            v-slot="{ list }"
            :query="params"
        >
            <table class="m-8">
                <tr
                    v-for="info in list"
                    :key="info._path"
                >
                    <td>{{ info._id }}</td>
                    <td class="px-4">{{ info.title }}</td>
                    <td class="px-4">
                        <pre>{{ info.body ? getItemText(info.body) : '' }}</pre>
                    </td>
                </tr>
            </table>
        </ContentList>
    </div>
</template>
