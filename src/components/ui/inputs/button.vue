<template>
  <button class="c_button" :class="[`c_button__${buttonColor}`, `c_button__${buttonType}`,]">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    buttonColor: {
      type: String,
    },
    buttonType: {
      type: String,
      default: 'square'
    },
  }
}
</script>

<style lang="scss" scoped>
$padding-1: var(--fs-4);
$padding-2: var(--fs-6);
$white : var(--c-0-100);
$black : #000;
$primary : var(--c-1-100);
$secondary : var(--c-2-100);
$valid: var(--c-4-100);
$delete: var(--c-3-100);

.c_button {
  padding: $padding-2 $padding-1;
  color: $white;
  cursor: pointer;
  border-width: 0;
  outline: none;

  &:hover {
    background-color: $secondary;
  }

  &__primary {
    background-color: $secondary;
    border-color: $secondary;
  }

  &__secondary {
    background-color: $primary;
    border-color: $primary;
  }

  &__delete {
    background-color: $delete;
    border-color: $delete;
  }

  &__link {
    padding: $padding-2 0;
    font-size: var(--fs-7);

    &:hover {
      background-color: transparent;
    }
  }
}

.c_button__square {
  border-radius: 3px;
}

.c_button__round {
  border-radius: var(--m-2);
}

.bg-white {
  .c_button {
    &__link {
      color: var(--c-1-00);
    }
  }
}
</style>