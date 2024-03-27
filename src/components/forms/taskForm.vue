<template>
    <Vueform ref="form$" v-model="formData" :endpoint="false" @submit="taskFormSubmit()">
        <GroupElement name="task_informations" label="Nouvelle tâche">
            <TextElement name="label" :rules="['required', 'max:255']" :columns="{ container: 8 }" placeholder="Nom" />
            <TextElement name="periodicity" input-type="number" :rules="['nullable', 'min:0', 'integer']"
                autocomplete="off" :columns="{ container: 4 }" placeholder="Périodicité" />
        </GroupElement>
        <GroupElement name="subtasks_list">
            <GroupElement name="container" :conditions="[['subtasks_list.subtasks', 'not_empty']]">
                <StaticElement name="first_name" content="Tâches secondaires" />
            </GroupElement>
            <ListElement name="subtasks" add-text="+ Ajouter une tâche secondaire" :initial="0">
                <template #default="{ index }">
                    <ObjectElement :name="index">
                        <TextElement name="subtask_label" :rules="['required']" />
                    </ObjectElement>
                </template>
            </ListElement>
        </GroupElement>
        <GroupElement name="form_actions">
            <ButtonElement name="submit" add-class="mt-2" submits :columns="6">Enregistrer</ButtonElement>
        </GroupElement>
    </Vueform>
</template>


<script>
import { useTaskStore } from '@/scripts/stores/taskStore'
import { ref, onMounted } from 'vue'

export default {
    components: {

    },
    setup(props, context) {
        const form$ = ref(null)
        const taskStore = useTaskStore()

        onMounted(async () => {
            let data = {
                label: 'test'
            }
            form$.value.load(data)
        })

        return { form$, taskStore }
    },
    data() {
        return {
            formData: {}
        }
    },
    methods: {
        taskFormSubmit() {
            // this.taskStore.postTask(this.formData)
        }
    }
}
</script>

<style scoped></style>