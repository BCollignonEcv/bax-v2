<script>
import { RouterView } from 'vue-router'
import { c_header, c_footer } from '@/components/customs/navigation';

export default {
  name: 'Home',
  components: {
    c_header, c_footer,
    RouterView
  },
  computed: {}
}
</script>

<template>
  <c_header />
  <main>
    <router-view v-slot="{ Component, route }">
        <component :is="Component" />
    </router-view>
  </main>
  <c_footer />
</template>

<style lang="scss">
@import '@/styles/scss/reset.scss';
@import '@/styles/scss/base.scss';
@import '@/styles/scss/layer.scss';
@import '@/styles/scss/animation.scss';
@import '@/styles/scss/main.scss';
</style>