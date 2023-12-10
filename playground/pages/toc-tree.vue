<template>
    <main>
        <table border="1">
            <ContentList
                v-slot="{ list }"
                path="/"
            >
                <tr
                    v-for="content of list"
                    :key="content._path"
                    valign="top"
                >
                    <td>{{ content._path }}</td>
                    <td>{{ content.title }}</td>
                    <td>{{ content.description }}</td>
                    <td>
                        <TocItem
                            :item="content.body?.toc"
                        />
                    </td>
                </tr>
            </ContentList>
        </table>
    </main>
</template>
