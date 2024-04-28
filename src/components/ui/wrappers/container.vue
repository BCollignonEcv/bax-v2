<template>
  <div class="c_container" :class="dynamicClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['settings'],
  computed: {
    dynamicClass() {
      if (this.settings && this.settings.type) {
        switch (this.settings.type) {
          case 'full':
            return 'balance'
        }
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.c_container {
  display: flex;
  gap: var(--m-4);
  align-items: center;

  &.inline {}

  &.balance {
    justify-content: space-between;
  }
}
</style>