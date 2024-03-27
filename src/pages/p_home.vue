<template>
  <c_page v-bind="pageConfig">
    <h4>Idée menu</h4>
    <c_menuCard _filename="collection_foods.jpg">
      <h5>Poulet moutarde</h5>
    </c_menuCard>
    <br>
    <br>
    <h4>Todo list</h4>
    <c_taskList :_tasks="taskStore.getTasks"></c_taskList>
  </c_page>
  <c_globalAction></c_globalAction>
</template>

<script>

import { useTaskStore } from '@/scripts/stores/taskStore'

import { c_menuCard } from '@/components/customs/menu'
import { c_taskList } from '@/components/customs/task'
import { c_globalAction } from '@/components/customs/actions'

export default {
  name: 'HomePage',
  components: {
    c_menuCard,
    c_taskList,
    c_globalAction
  },
  setup() {
    const taskStore = useTaskStore()
    return { taskStore }
  },
  data() {
    return {
      pageConfig: {
        padding: true,
        background: false
      }
    }
  }
}
</script>

<style scoped></style>