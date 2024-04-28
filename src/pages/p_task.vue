<template>
  <c_page v-bind="pageConfig">
    <template v-if="!editMode">
      <h2>{{ _task.label }}</h2>
      <button @click="editMode = !editMode">Edit</button>
    </template>
    <template v-else>
      <div class="c_formBackground">
        <f_task :_task="task"></f_task>
      </div>
    </template>
  </c_page>
  <!-- <c_globalAction></c_globalAction> -->
</template>

<script>
import { c_globalAction } from '@/components/customs/actions'
import { f_task } from '@/components/forms'

import { Task } from '@/scripts/class/Task.js';

export default {
  name: 'task',
  components: {
    c_globalAction,
    f_task
  },
  props: {
    _task: {
      type: Object,
      default: new Task()
    },
  },
  data() {
    return {
      task: this._task,
      editMode: this._task.empty,
      pageConfig: {
        padding: true,
        background: false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.c_formBackground {
  background-color: white;
  padding: var(--m-5);
  border-radius: var(--m-7);

  :deep() {
    @include dark-text;
  }

}
</style>