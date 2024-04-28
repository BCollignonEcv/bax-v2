<template>
  <c_page v-bind="pageConfig">
    <h2>Tâches</h2>
  </c_page>
  <c_globalAction></c_globalAction>
</template>

<script>
import { c_globalAction } from '@/components/customs/actions'

export default {
  name: 'HomePage',
  components: {
    c_globalAction
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