<template>
    <div class="c_globalAction">
        <transition-group name="open-top-fade">
            <template v-if="!open">
                <div class="c_globalAction-trigger" @click="openActions()">
                    <c_buttonAction icon="add"></c_buttonAction>
                </div>
            </template>
            <template v-if="open">
                <div class="c_globalAction-overlay">
                    <router-link to="tasks/create-task">
                        <c_buttonAction icon="checklist"></c_buttonAction>
                    </router-link>
                    <c_buttonAction icon="close" @click="closeActions()"></c_buttonAction>
                </div>
            </template>
        </transition-group>
        <div v-if="open" class="c_globalAction-background" @click="closeActions()"></div>
    </div>
</template>

<script>

export default {
    props: {},
    data() {
        return {
            open: false,
        }
    },
    methods: {
        openActions() {
            this.open = true;
        },
        closeActions() {
            this.open = false;
        }
    },
    computed: {},
}
</script>

<style lang="scss">
.c_globalAction {
    &-trigger {
        z-index: 150;
        position: fixed;
        right: var(--m-5);
        bottom: var(--m-5);
    }

    &-overlay {
        z-index: 150;
        position: fixed;
        right: var(--m-5);
        bottom: var(--m-5);

        display: flex;
        flex-direction: column;
        gap: var(--m-7);
    }

    &-background{
        z-index: 149;
        position: fixed;
        top: var(--header-size);
        left: 0;
        height: calc(100vh - var(--header-size));
        width: 100vw;
    }
}

.open-top-fade-enter-active,
.open-top-fade-leave-active {
    transition: all .5s ease;

    * {
        transition: all .5s ease;
    }
}

.open-top-fade-enter-from {
    opacity: .5;

    .c_buttonRound{
        margin-bottom: -100%;
    }

    .c_buttonRound:last-of-type{
        margin-bottom: 0;
    }
}

.open-top-fade-leave-to {
    opacity: 0;

    .c_buttonRound{
        margin-bottom: -100%;
    }

    .c_buttonRound:last-of-type{
        margin-bottom: 0;
    }
}
</style>