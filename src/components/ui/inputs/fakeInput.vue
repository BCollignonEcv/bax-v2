<template>
  <div class="c_input c_fakeInput">
    <p class="c_input__field">{{ modelValue }}</p>
    <label v-if="inputName" class="c_input__label" :for="inputId">{{ inputName }}</label>
  </div>
</template>

<script>


export default {
  props: ['inputType', 'inputId', 'inputName', 'inputRequirement', 'modelValue', 'disabled'],
}
</script>

<style lang="scss">
.c_input.c_fakeInput{
  .c_input__field{
    border: none;
    color: var(--c-1-100)
  }
}
</style>