<template>
    <div class="c_collapseButton" :class="{ 'open': isExpended }" ref="collapseButton">
        <button @click="toggleExpand" class="c_collapseButton__trigger">
            <slot name="trigger">
                <c_buttonAction :_icon="'add'"></c_buttonAction>
            </slot>
        </button>
        <transition name="slide-down-fade">
            <div v-if="isExpended" class="c_collapseButton__collapse" :class="[_direction]" ref="collapse">
                <div class="c_collapseButton__collapse-content">
                    <slot name="content"><p>Content Element</p></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>

export default {
    components: {},
    props: {
        _isExpended: {
            type: Boolean,
            default: false
        },
        _direction: {
            type: String,
            default: 'toLeft'
        }
    },
    data() {
        return {
            isExpended: this._isExpended,
        }
    },
    computed: {},
    watch: {},
    methods: {
        toggleExpand() {
            this.isExpended = !this.isExpended
            if (this.isExpended) {
                this.$refs.collapseButton.style.marginBottom = `70px`;
                setTimeout(() => {
                    let collapseHeight = this.$refs.collapse;
                    collapseHeight = collapseHeight.offsetHeight + 12;
                    this.$refs.collapseButton.style.marginBottom = `${collapseHeight}px`;
                }, 300);
            } else {
                this.$refs.collapseButton.style.marginBottom = 0;
            }
        }
    }
}
</script>

<style lang="scss">
.c_collapseButton {
    position: relative;
    transition: margin 0.5s ease-in;

    .c_collapseButton__trigger {}

    .c_collapseButton__collapse {
        background-color: white;
        position: absolute;
        top: calc(100% + var(--m-6));
        border-radius: 5px;
        width: calc(100vw - 2 * var(--m-4));
        padding: var(--m-6);

        &.toLeft {
            right: 0;
        }

        &.toRight {
            left: 0;
        }

        &-content {}
    }

    &.open {
        z-index: 50;
        transition: margin 0.5s ease-out;

        .c_collapseButton__trigger {
            .c_buttonRound {
                background-color: var(--c-2-100);
            }
        }
    }
}


.slide-down-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-down-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-down-fade-enter-from,
.slide-down-fade-leave-to {
    transform: translateY(-20px);
}
</style>