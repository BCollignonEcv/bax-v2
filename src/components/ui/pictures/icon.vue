<template>
    <template v-if="background.active">
        <div class="backgroundedIcon" :class="background.color">
            <img :src="`../../assets/icons/${_name}.${_color}.svg`" class="c_icon" :class="_size"/>
        </div>
    </template>
    <template v-else>
        <img :src="`../../assets/icons/${_name}.${_color}.svg`" class="c_icon" :class="_size"/>
    </template>
</template>

<script>
export default {
    props: {
        _size: {
            type: String,
            default: 'normal'
        },
        background: {
            type: Object,
            default: () => ({active: false, color: 'dark'})
        },
        _name: {
            type: String,
            default: 'default',
            required: true
        },
        _color: {
            type: String,
            default: 'black'
        }
    },
    computed: {},
    methods: {},
    mounted() {}
}
</script>

<style lang="scss" scoped>
.backgroundedIcon {
    padding: var(--fs-7);
    // background-color: var(--c-2-100);
    border: 1px solid var(--c-0-100);
    border-radius: var(--m-2);

    &.dark {
        background-color: var(--c-1-50);
    }
}

.c_icon {
    &.normal {
        width: 24px;
        height: 24px;
    }

    &.xsmall {
        width: 12px;
        height: 12px;
    }

    &.small {
        width: 16px;
        height: 16px;
    }

    &.big {
        width: 32px;
        height: 32px;
    }

    &.huge {
        width: 48px;
        height: 48px;
    }
}
</style>