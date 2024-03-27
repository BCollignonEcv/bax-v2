<template>
  <div class="c_timer" :class="status">
    <p>{{ number }}</p>
  </div>
</template>

<script>

export default {
  name: 'Timer',
  props: {
    number: {
      type: Number,
    },
    progress: {
      type: Number
    },
    status: {
      type: String,
      default: 'normal'
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss">
.c_timer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 25px;
  background-color: var(--c-0-100);

  width: 50px;
  height: 50px;

  &.normal {
    border: 5px solid var(--c-2-100);
  }

  &.medium {
    border: 5px solid orange;
  }

  &.urgent {
    background-color: rgb(241, 62, 62);
    border: 5px solid orange;
  }

  p {
    color: var(--c-1-100);
    margin-top: .2rem;
    font-weight: bold;
  }
}
</style>