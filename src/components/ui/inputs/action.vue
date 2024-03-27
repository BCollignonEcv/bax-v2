<template>
  <button class="c_buttonRound" :class="['c_buttonRound__'+size]">
    <c_icon :_name="icon" :_size="size" _color="white"></c_icon>
  </button>
</template>

<script>

export default {
  name: 'RoundButton',
  components: { },
  props: { 
    icon: String,
    size: {
      type: String,
      default: 'normal'
    },
    color: String
  }
};
</script>

<style lang="scss">
.c_buttonRound {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
  padding: var(--m-6);
  width: 48px;
  height: 48px;
  background-color: var(--c-5-100);

  &.c_buttonRound__small{
    width: 36px;
    height: 36px;
  }

  &.c_buttonRound__xsmall{
    width: 24px;
    height: 24px;
  }

  &.primary{
    background-color: var(--c-1-100);
  }

  &.secondary{
    background-color: var(--c-2-100);
  }

  &.delete{
    background-color: var(--c-3-100);
  }
  
}
</style>