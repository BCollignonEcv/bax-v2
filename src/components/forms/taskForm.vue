<template>
    <Vueform ref="form$" v-model="formData" :endpoint="false" @submit="taskFormSubmit()">
        <StaticElement name="task_title" content="Tâche" tag="h2" />
        <StaticElement name="divider" tag="hr" />
        <TextElement name="label" :rules="['required', 'max:255']" placeholder="Nom" />
        <GroupElement name="task_informations">
            <TextElement name="periodicity" input-type="number" :rules="['min:0', 'integer']" autocomplete="off"
                :columns="{ container: 4 }" placeholder="Périodicité" />
            <CheckboxElement name="required" text="Required" :columns="{ container: 8 }"/>
        </GroupElement>
        <GroupElement name="subtasks_list">
            <GroupElement name="container" :conditions="[['subtasks_list.subtasks', 'not_empty']]">
                <StaticElement name="subtask_label" content="Tâches secondaires" />
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
import * as taskHelpers from '@/scripts/helpers/taskHelpers'

import { useTaskStore } from '@/scripts/stores/taskStore'
import { ref, onMounted } from 'vue'

export default {
    components: {

    },
    setup(props, context) {
        const form$ = ref(null)
        const taskStore = useTaskStore()

        // onMounted(async () => {
        //     let data = {
        //         label: 'test'
        //     }
        //     form$.value.load(data)
        // })

        return { form$, taskStore }
    },
    data() {
        return {
            formData: {}
        }
    },
    methods: {
        taskFormSubmit() {
            let newTask = taskHelpers.formatData(this.formData);
            this.taskStore.request_postTask(newTask)
        }
    }
}
</script>

<style lang="scss">
:root,
:before,
:after,
* {
    --vf-primary: #0065ff;
}
</style>