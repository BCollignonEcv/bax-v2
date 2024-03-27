<template>
    <div class="c_taskItem">
        <c_modal v-bind="{...modalConfig, name: _task.label}">
            <template v-slot:trigger>
                <c_task :_task="_task"></c_task>
            </template>
            <template v-slot:content>
                <c_taskPopin :_task="_task"></c_taskPopin>
            </template>
        </c_modal>
    </div>
</template>

<script>
import { c_task, c_taskPopin } from '@/components/customs/task'

export default {
    components: {
        c_task, c_taskPopin,
    },
    props: {
        _task: Object
    },
    data() {
        return {
            modalConfig: {
                outsideBackground: true,
                headerBackground: true
            }
        }
    },
    computed: {},
    methods: {}
}
</script>

<style lang="scss">
.c_taskItem+.c_taskItem {
    margin-top: var(--m-6);
}
</style>