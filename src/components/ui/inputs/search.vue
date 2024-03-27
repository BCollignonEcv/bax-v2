<template>
    <div class="c_input">
        <input class="c_input__field" :id="inputId" :type="config.inputType" :placeholder="config.inputName"
            :required="config.required" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
            :disabled="disabled">
        <label class="c_input__label" :for="inputId">{{ config.inputName }}</label>
    </div>
</template>

<script>
import { c_input } from '@/components/ui/inputs/index'

export default {
    components: { c_input },
    props: ['config', 'modelValue', 'disabled'],
    emits: ['update:modelValue'],
    data() {
        return {
            selectedOption: "test",
            showOptions: false
        }
    },
    computed: {},
    methods: {
        toggleSearch() {
            if (!this.disabled) {
                this.showSearch = !this.showSearch;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>