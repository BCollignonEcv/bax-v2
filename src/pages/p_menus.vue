<template>
  <c_page v-bind="pageConfig">
    <h2>Menus</h2>
  </c_page>
  <c_globalAction></c_globalAction>
</template>

<script>
import { c_globalAction } from '@/components/customs/actions'

export default {
  name: 'MenuPage',
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