<template>
    <div class="page" :class="{'enablePadding': padding, 'enableBackground': background}">
        <slot></slot>

    </div>
</template>

<script>
export default {
    props: {
        padding: Boolean,
        background: Boolean,
        dark: Boolean
    },
}
</script>

<style scoped lang="scss">
    .page {
        min-height: calc(100vh - var(--header-size) - var(--footer-size));
        
        &.enablePadding {
            padding: var(--m-4);
        }

        &.enableBackground {
            background-color: var(--c-0-100);

            :deep() {
                @include dark-text;
            }
        }
    }
</style>