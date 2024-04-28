<template>
    <transition name="slide-fade">
        <div v-if="!isOpen" @click="toggleFrame" class="c_sideFrame-trigger">
            <slot name="trigger"></slot>
        </div>
        <section v-else class="c_sideFrame bg-white" :class="from">
            <div class="c_sideFrame__header">
                <slot name="title"><br></slot>
                <div class="c_sideFrame__header-actions">
                    <slot name="headerActions"><br></slot>
                    <c_icon :_name="'close'" @click="toggleFrame"></c_icon>
                </div>
            </div>
            <div class="c_sideFrame__content">
                <slot name="content"></slot>
            </div>
            <div class="c_sideFrame__footer">
                <slot name="footer"></slot>
            </div>
        </section>
    </transition>
</template>

<script>

export default {
    components: {},
    props: {
        from: {
            type: String,
            default: 'left'
        }
    },
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
    width: 100%;
    height: 100%;
}

.c_sideFrame {
    z-index: 300;
    position: fixed;
    top: 0;
    right: 0;
    width: $frameWidth;
    min-height: 100vh;
    background-color: var(--c-0-100);
    box-shadow: 0 0 0 999em rgba(0, 0, 0, 0.8);
    color: var(--c-1-100) !important;
    display: flex;
    flex-direction: column;

    &.left {
        left: 0;
    }

    &__header {
        height: var(--header-size);
        width: 100%;
        padding: 0 var(--m-4);
        font-weight: bold;
        display: flex;
        gap: var(--m-4);
        align-items: center;
        justify-content: space-between;

        &-actions {
            display: flex;
            gap: var(--m-5);
        }
    }

    &__content {
        padding: 0 var(--m-4);
    }

    &__footer {
        padding: var(--m-4);
        margin-top: auto;
    }
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(50vw);
    opacity: 0;
}

.left.slide-fade-enter-from,
.left.slide-fade-leave-to {
    transform: translateX(-50vw);
    opacity: 0;
}
</style>