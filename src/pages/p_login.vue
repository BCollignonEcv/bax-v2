<template>
  <c_page v-bind="pageConfig">
    <h2>Connexion</h2>
      <br>
      <f_login></f_login>
      <!-- <f_task></f_task> -->
  </c_page>
</template>

<script>
import { f_login, f_task } from '@/components/forms'



export default {
  name: 'Authentification',
  components: {
    f_login, f_task
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