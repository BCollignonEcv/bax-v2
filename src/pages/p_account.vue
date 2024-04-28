<template>
    <c_page v-bind="pageConfig">
      <h2>Mon compte</h2>
    </c_page>
  </template>
  
  <script>
  
  export default {
    name: 'HomePage',
    components: {},
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