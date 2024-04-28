<template>
    <div class="c_task">
        <c_timer :number="_task.remainingDays" :progress="_task.progress" :status="_task.status"></c_timer>
        <p class="c_task-label">{{ _task.label }}</p>
        <div class="c_task-actions">
            <c_icon :_name="'next'" _size="small" _color="white"></c_icon>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        _task: Object
    },
    data() {
        return {}
    },
    computed: {},
    methods: {}
}
</script>

<style lang="scss">
$size: 50px;
$halfSize: 25px;

.c_task {
    position: relative;
    background-color: var(--c-0-25);
    border-radius: $halfSize var(--m-7) var(--m-7) $halfSize;
    overflow: hidden;
    height: $size;
    display: flex;
    align-items: center;
    gap: var(--m-5);


    & .c_task-remaining {
        height: 100%;
        padding: var(--m-7) var(--m-5);
        display: flex;
        align-items: center;
        justify-content: space-around;
        min-width: $size;

        &.normal {
            background-color: var(--c-2-100);
            // & .c_task-progress {
            //     background-color: rgba(100, 0, 0, .5);
            // }
        }

        &.medium {
            background-color: rgba(170, 78, 2, 0.5);
            // & .c_task-progress {
            //     background-color: rgba(100, 0, 0, .5);
            // }
        }

        &.urgent {
            background-color: rgba(100, 0, 0, 1);
        }
    }

    & .c_task-label {
        padding-top: 0.2em;
        /* Ajuster la valeur selon les besoins */
    }

    & .c_task-actions {
        padding-right: var(--m-7);
        margin-left: auto;
    }
}

</style>