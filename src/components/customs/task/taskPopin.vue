<template v-if="_task">
    <div class="c_taskPopin">
        <div class="c_taskPopin-informations">
            <div class="information-hightlight">
                <c_iconText _name="calendar">
                    <p>{{ getDisplayDate(_task.dueDate) }}</p>
                </c_iconText>
            </div>
            <div class="information-hightlight">
                <c_iconText _name="reload">
                    <p>{{ _task.periodicity }} jours</p>
                </c_iconText>
            </div>
        </div>
        <br>
        <template v-if="_task.subtasks">
            <ul class="c_taskPopin-subtasks">
                <li class="line" v-for="subtask in _task.subtasks">
                    {{ subtask }}
                </li>
            </ul>
            <br>
        </template>
        <h5>Historique</h5>
        <template v-if="_task.history">
            <div class="c_taskPopin-history">
            <div class="line" v-for="occurence in _task.history">
                <p>{{ getDisplayDate(occurence.date) }}</p>
                <p>{{ occurence.username }}</p>
            </div>
        </div>
        </template>

        <div class="c_taskPopin-actions">
            <c_button v-bind="buttonConfig" @click="taskStore.request_validateTask(_task.id)">Valider</c_button>
            <c_buttonAction icon='speed' @click="taskStore.request_requireTask(_task.id)"></c_buttonAction>
            <c_buttonAction icon='edit' @click="taskStore.request_validateTask(_task.id)"></c_buttonAction>
            <c_buttonAction icon='delete' @click="deleteTask(_task.id)"></c_buttonAction>
        </div>
    </div>
</template>

<script>
import { useTaskStore } from '@/scripts/stores/taskStore'

export default {
    components: {},
    props: {
        _task: Object
    },
    setup() {
        const taskStore = useTaskStore()
        return { taskStore }
    },
    data() {
        return {
            buttonConfig: {
                buttonColor: 'primary',
                buttonType: 'round'
            },
            iconConfig: {
                background: {
                    active: true,
                    color: 'dark'
                },
                _size: 'small'
            }
        }
    },
    computed: {},
    methods: {
        getDisplayDate(date) {
            return date.toLocaleDateString('fr-FR', { weekday: 'long' }) +
                ' ' + date.getDate() +
                ' ' + date.toLocaleDateString('fr-FR', { month: 'long' });
        },
        deleteTask(taskID) {
            this.taskStore.request_removeTask(taskID)
        }
    }
}
</script>

<style lang="scss">
.c_taskPopin {
    & &-informations {
        display: flex;
        justify-content: space-between;
        gap: var(--m-7);

        div:first-of-type {
            flex: 2;
        }

        .information-hightlight {
            flex: 1;
            background-color: var(--c-1-25);
            padding: var(--m-5);
            border-radius: 2px;
        }
    }

    & &-subtasks {
        margin-left: var(--m-5);
        list-style: disc;
    }

    & &-history {
        .line {
            display: flex;
            padding-top: 5px;
            border-top: 1px solid var(--c-1-25);

            p {
                flex: 2;
            }

            p:first-of-type {
                flex: 1;
            }

            &+.line {
                margin-top: 5px;
            }
        }
    }

    & &-actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: var(--m-5);
        margin-top: var(--m-5);

        .c_button {
            flex: 2;
        }
    }
}
</style>