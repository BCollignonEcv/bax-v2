<template>
    <div class="c_menuCard" :class="'a'">
        <c_image class="c_menuCard-img" :_filename _size="fullHeight"></c_image>
        <div class="c_menuCard-content">
            <slot></slot>
        </div>
        <div class="c_menuCard-actions">
            <c_icon :_name="'next'" _size="small" _color="white"></c_icon>
        </div>
    </div>
</template>

<script>
export default {

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
.c_menuCard {
    background-color: var(--c-0-25);
    border-radius: var(--m-7);
    padding: var(--m-7);
    display: flex;
    min-height: 100px;
    height: 12vh;
    gap: var(--m-5);

    & &-img {
        :deep(img) {
            border-radius: var(--m-7);
        }
    }

    & &-content, & &-actions {
        display: flex;
        flex-direction: column;
        justify-content: center;
        vertical-align: text-top;

        :deep() {
            @include reset-mp;
        }
    }
    
    & &-actions {
        margin-left: auto;
    }
}
</style>