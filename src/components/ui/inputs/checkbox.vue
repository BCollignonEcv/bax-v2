<template>
  <div class="c_input" :class="{ 'hidden': inputType === 'hidden' }">
    <input class="c_input__field" :id="`input_${this.inputId}`" :type="inputType" :placeholder="inputName"
      :required="inputRequirement" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
      :disabled="disabled">
    <label v-if="inputName" class="c_input__label" :for="inputId">{{ inputName }}</label>
  </div>
</template>

<script>


export default {
  props: ['inputType', 'inputId', 'inputName', 'inputRequirement', 'modelValue', 'disabled'],
  emits: ['update:modelValue'],
}
</script>

<style lang="scss">
$white : var(--c-0-100);
$black : #000;
$primary : var(--c-1-100);
$secondary : var(--c-2-100);
$valid: var(--c-4-100);
$invalid: var(--c-3-100);
$neutral: var(--c-5-100);
$padding: 15px;

.c_input {
  position: relative;
  padding: $padding 0 0;
  margin-bottom: $padding;
  width: 100%;

  .c_input__field {
    width: 100%;
    color: $secondary;
    background: transparent;
    border: 0;
    border-bottom: 2px solid $primary;
    padding: 5px 0;
    transition: border-color 0.2s;

    &::placeholder {
      color: transparent
    }

    &:placeholder-shown {
      +.c_input__label {
        top: $padding;
        font-size: var(--fs-6);
      }
    }

    &:disabled {
      color: $primary;
      border-bottom: 2px solid transparent !important;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px $white inset !important;
      -webkit-text-fill-color: $secondary !important;
    }
  }

  .c_input__field:focus {
    border-color: $secondary;
    color: $secondary;

    +.c_input__label {
      top: 0;
      transition: 0.2s;
      color: $secondary;
      font-size: var(--fs-7);
      cursor: default;
    }
  }

  &.hidden {
    padding: 0;
    margin: 0;
    height: 0;
  }
}

.c_input__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  color: $primary;
  font-size: var(--fs-7);
  cursor: text;
  user-select: contain;
}

.bg_dark {
  .c_input {

    .c_input__field {
      color: $secondary;
      border-bottom: 2px solid $white;

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px var(--c-1-100) inset !important;
      }

      &:disabled {
        color: $neutral;
      }
    }

    .c_input__label {
      color: $white;
    }

    .c_input__field:focus {
      border-color: $secondary;
    }
  }
}
</style>