<!-- TODO : Voir comment gerer la fermeture de la modal avec le retour en arrière natif -->

<template>
    <div class="c_modal">
        <template v-if="!open">
            <div class="c_modal-trigger" @click="openModal()">
                <slot name="trigger">Closed</slot>
            </div>
        </template>
        <template v-if="open">
            <div class="c_modal-popin" :class="{ 'fullHeight': fullHeight, 'unify': background }">
                <template v-if="background">
                    <div class="c_modal-header" :class="{ 'header-higthlight': headerBackground }">
                        <h4>{{ name }}</h4>
                        <c_icon :_name="'close'" _size="small" @click="closeModal()"></c_icon>
                    </div>
                </template>
                <div class="c_modal-content">
                    <slot name="content">Opened</slot>
                </div>
            </div>
        </template>
        <div v-if="open && outsideBackground" class="c_modal-background" @click="closeModal()"></div>
    </div>
</template>

<script>

export default {
    components: {},
    props: {
        outsideBackground: Boolean,
        headerBackground: Boolean,
        background: {
            type: Boolean,
            default: true
        },
        fullHeight: Boolean,
        name: String
    },
    data() {
        return {
            open: false,
        }
    },
    methods: {
        openModal() {
            this.open = true;
        },
        closeModal() {
            this.open = false;
        }
    }
}
</script>

<style scoped lang="scss">
.c_modal {
    position: relative;

    &-trigger {}

    &-popin {
        overflow: hidden;
        position: fixed;
        width: calc(100vw - 2 * var(--m-4));
        top: 50%;
        transform: translate(0, -50%);
        left: var(--m-4);
        z-index: 150;
        border-radius: var(--m-7);

        display: flex;
        flex-direction: column;

        &.unify {
            background-color: var(--c-0-100);
            box-shadow: 0px 0px var(--m-5) rgb(0, 0, 0);
        }

        &.fullHeight {
            top: calc(var(--m-1) + var(--header-size));
            height: calc(100vh - 2 * var(--m-1) - var(--header-size));
            transform: unset;
        }

        .c_modal-header {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            justify-content: space-between;
            padding: var(--m-5);
            gap: var(--m-7);

            &.header-higthlight {
                background-color: var(--c-2-100);
            }

            :deep() {
                @include reset-mp;
            }
        }

        .c_modal-content {
            padding: var(--m-5);
            gap: var(--m-7);
        }

        .c_modal-actions {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-top: auto;
        }

        :deep() {
            @include dark-text;
        }
    }

    &-background {
        z-index: 149;
        position: fixed;
        top: var(--header-size);
        left: 0;
        height: calc(100vh - var(--header-size));
        width: 100vw;
        background-color: var(--c-1-50);
    }
}
</style>