<template>
    <section class="c_todoList">
        <c_taskItem v-for="_task in _tasks" :_task></c_taskItem>
    </section>
</template>

<script>
import { default as c_taskItem } from './taskItem.vue'

export default {
    components: {
        c_taskItem
    },
    props: {
        _tasks: {
            type: Object,
            default: []
        }
    },
    data() {
        return {}
    }
}
</script>

<style lang="scss" scoped></style>