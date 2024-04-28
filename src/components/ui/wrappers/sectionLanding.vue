<template>
    <section class="c_section">
        <slot></slot>
    </section>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.c_section {
    min-height: 100vh;
    // min-height: calc(100vh - var(--header-size));
}
</style>