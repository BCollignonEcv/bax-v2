<template>
    <section class="c_section">
        <div v-if="title" class="c_section-header">
            <h3 class="c_section-title">{{ title }}</h3>
            <div class="c_section-actions">
                <slot name="actions"></slot>
            </div>
        </div>
        <slot></slot>
    </section>
</template>

<script>
export default {
    props: ['title']
}
</script>

<style lang="scss" scoped>
.c_section{
    margin-bottom: var(--m-4);
    .c_section-header{
    display: flex;
    justify-content: space-between;
    padding: var(--m-5) 0;
    .c_section-title{
        flex: 2;
        padding-top: 12px;
        margin-bottom: 0;
    }

    .c_section-actions{
        flex: 1;
        display: flex;
        justify-content: right;
        gap: var(--m-5);
    }
}
}

</style>