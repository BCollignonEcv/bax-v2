<template>
  <div class="c_input c_textarea">
    <textarea class="c_input__field" :id="inputId" :type="config.inputType" :placeholder="config.display"
      :required="config.required" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
      :disabled="disabled"></textarea>
    <label class="c_input__label" :for="inputId">{{ config.display }}</label>
  </div>
</template>

<script>


export default {
  props: ['config', 'modelValue', 'disabled'],
  emits: ['update:modelValue'],
  computed: {
    inputId() { return `input_${this.config.inputName}` }
  }
}
</script>

<style lang="scss">
</style>