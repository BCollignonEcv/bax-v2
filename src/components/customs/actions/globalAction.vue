<template>
    <div class="c_global">
        <c_modal v-bind="modalConfig">
            <template v-slot:trigger>
                <c_buttonAction icon="add" v-bind="buttonActionConfig"></c_buttonAction>
            </template>
            <template v-slot:content>
                <div class="c_action">
                    <c_icon :_name="'add'"></c_icon>
                    <br>
                    <p>Create task</p>
                </div>
                <div class="c_action">
                    <c_icon :_name="'add'"></c_icon>
                    <br>
                    <p>Create menu</p>
                </div>
                <div class="c_action">
                    <c_icon :_name="'add'"></c_icon>
                    <br>
                    <p>Add item</p>
                </div>
            </template>
        </c_modal>
    </div>
</template>

<script>

export default {
    props: {},
    data() {
        return {
            buttonActionConfig: {
                _color: 'secondary'
            },
            modalConfig: {
                background: false,
                outsideBackground: true
            }
        }
    },
    computed: {},
    methods: {}
}
</script>

<style lang="scss">
.c_global {
    position: fixed;
    right: var(--m-5);
    bottom: var(--m-5);

    .c_action {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        background-color: var(--c-0-100);
        padding: var(--m-5);
        border-radius: var(--m-5);

        &+.c_action{
            margin-top: var(--m-3);
        }
    }
}
</style>