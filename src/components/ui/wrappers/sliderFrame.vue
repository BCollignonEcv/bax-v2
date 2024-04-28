<template>
    <div class="c_sliderFrame" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
        <div class="c_sliderFrame--options">
            <slot name="options">
                <button>Delete</button>
            </slot>
        </div>
        <div class="c_sliderFrame--content">
            <slot name="content">
                content
            </slot>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            startX: 0,
            currentX: 0,
            translateX: 0,
            isSwipe: false,
        };
    },
    computed: {
        optionsStyle() {
            return {
                transform: `translateX(${this.translateX}px)`,
            };
        },
    },
    methods: {
        handleTouchStart(event) {
            this.startX = event.touches[0].clientX;
            this.currentX = this.startX;
            this.translateX = 0;
            this.isSwipe = false;
        },
        handleTouchMove(event) {
            this.currentX = event.touches[0].clientX;
            this.translateX = this.currentX - this.startX;

            if (this.translateX < 0) {
                // Déplacer les options avec le swipe
                this.isSwipe = true;
            }
        },
        handleTouchEnd() {
            if (this.isSwipe) {
                // L'utilisateur a effectué un swipe, vous pouvez mettre à jour l'état ou exécuter une action
            }

            // Réinitialiser la position des options
            this.translateX = 0;
            this.isSwipe = false;
        },
    },
}
</script>

<style lang="scss" scoped>
.c_sliderFrame {
    height: 100%;
    width: 100%;
    position: relative;
    border: solid 1px black;

    &--content {
        background-color: white;
    }

    &--options {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        display: flex;
        background-color: red;
    }
}
</style>