<template>
    <main>
        <ContentHouse>
            <template #title="{ item }">
                <p>{{ item.title ?? '\'no-title\'' }}</p>
            </template>
            <template #description="{ item }">
                <p>{{ item.description ?? '\'no-description\'' }}</p>
            </template>
            <template #content="{ item }">
                <TocItem :item="item.body?.toc" />
            </template>
        </ContentHouse>
    </main>
</template>
