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
                        <pre>{{ JSON.stringify(content, undefined, '    ') }}</pre>
                    </td>
                </tr>
            </ContentList>
        </table>
    </main>
</template>
