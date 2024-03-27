<template>
    <div class="c_expandFrame">
        <transition name="slide-down-fade">
            <div @click="toggleFrame" class="c_expandFrame-trigger">
                <slot name="trigger"></slot>
            </div>
            <div class="c_expandFrame-expand">
                <div class="c_expandFrame__content">
                    <slot name="content" @close="toggleFrame"></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { default as c_container } from '@/components/ui/wrappers/container.vue'
import { c_icon } from '@/components/ui/pictures/index'

export default {
    components: {
        c_container, c_icon
    },
    props: ['from'],
    data() {
        return {
            isOpen: false,
        }
    },
    methods: {
        toggleFrame() {
            this.isOpen = !this.isOpen
        },
    }
}
</script>

<style lang="scss" scoped>
$frameWidth: 90vw;

.c_sideFrame-trigger {
    // width: 100%;
    // height: 100%;
}

.c_sideFrame {
    z-index: 100;
    position: fixed;
    top: 0;
    right: 0;
    width: $frameWidth;
    min-height: 100vh;
    background-color: var(--c-0-100);
    box-shadow: 0 0 0 999em rgba(0, 0, 0, 0.8);
    color: var(--c-1-100) !important;

    .left {
        left: 0;
    }

    &__header {
        height: var(--header-size);
        width: 100%;
        padding: 0 var(--m-4);
        font-weight: bold;
    }

    &__content {
        padding: 0 var(--m-4);
    }
}

.slide-down-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-down-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-down-fade-enter-from,
.slide-down-fade-leave-to {
    transform: translateY(20px);
    opacity: 0;
}
</style>