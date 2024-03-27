<template>
    <div class="c_card">
        <slot></slot>
    </div>
</template>

<script>

export default {
    components: {},
    props: {
        _filename: {
            type: String,
        },
        _title: {
            type: String,
        }
    },
}
</script>

<style lang="scss" scoped>
.c_card {
    // background-color: var(--c-0-25);
    border: 1px solid var(--c-0-25);
    border-radius: var(--m-7);
    padding: var(--m-7);
    display: flex;
    min-height: 100px;
    height: 12vh;
    gap: var(--m-7);
}
</style>