<template>
  <c_page v-bind="pageConfig">
    <h2>Bienvenue</h2>
      <f_registration></f_registration>
  </c_page>
</template>

<script>
import {  f_registration } from '@/components/forms'



export default {
  name: 'Registration',
  components: {
    f_registration
  },
  data() {
    return {
      pageConfig: {
        padding: true,
        background: true
      }
    }
  }
}
</script>

<style scoped></style>