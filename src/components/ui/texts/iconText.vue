<template>
    <div class="c_iconText" :class="{ 'reverse': _iconFirst !== true }">
        <c_icon :_name :_color :_size :_backgrounded></c_icon>
        <slot class="c_iconText-text"></slot>
    </div>
</template>

<script>

export default {
    components: {},
    props: {
        _name: String,
        _size: {
            type: String,
            default: 'small'
        },
        _backgrounded: {
            type: Boolean,
            default: false
        },
        _color: String,
        _iconFirst: {
            type: Boolean,
            default: true
        },
    },
}
</script>

<style lang="scss">

.c_iconText {
    display: flex;
    gap: 8px;
    align-items: center ;

    &.reverse {
        flex-direction: row-reverse;
    }

    p.small {
        margin-top: .2rem;
        font-size: var(--fs-8);
        white-space: nowrap;
    }

    p, h1, h2, h3, h4, h5 {
        margin: 0;
        padding: 0;
        display: inline;
    }
}
</style>