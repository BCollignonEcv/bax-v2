<template>
    <div class="c_input">
        <select class="c_select" v-model="selectedOption">
            <option value disabled selected hidden>Choisir</option>
            <option v-for="(option, index) in optionList" :key="index" :value="option.value">{{ option.label }}</option>
        </select>
    </div>
    <label v-if="inputName" class="c_input__label">{{ inputName }}</label>
</template>

<script>
export default {
    props: {
        'inputName': String,
        'modelValue': Object | String,
        'dataType': undefined,
        'optionList': {
            require: true
        },
        'disabled': Boolean
    },
    emits: ['update:modelValue'],
    data() {
        return {
            selectedOption: ''
        }
    },
    created() { },
    mounted() {
        if (this.modelValue) {

            // Use dataType to create class object to fit with optionList.value
            if (this.dataType) {
                this.selectedOption = new this.dataType(this.modelValue);
            } else {
                this.selectedOption = this.modelValue
            }
        } else if (this.optionList.length > 0) {
            this.selectedOption = this.optionList[0].value
        }
    },
    methods: {},
    watch: {
        selectedOption() {
            this.$emit('update:modelValue', this.selectedOption)
        },
        modelValue() {
            this.selectedOption = this.modelValue
        }
    }
}
</script>

<style lang="scss" scoped>
$white : var(--c-0-100);
$black : #000;
$primary : var(--c-1-100);
$secondary : var(--c-2-100);
$valid: var(--c-4-100);
$invalid: var(--c-3-100);
$neutral: var(--c-5-100);
$padding: 15px;

.c_select {
    margin-top: -1px;
    padding: 5px 0;
    width: 100%;
    border: none;
    border-bottom: 2px solid $primary;
    background: transparent;
    color: $secondary;
    font-size: 15px;

    &::placeholder {
        color: grey;
    }

    &:focus,
    &:focus-visible,
    &:visited,
    &:active {
        border: none;
        outline: none;
        border-bottom: 2px solid $primary;
    }

    option {
        color: $secondary;
        background-color: transparent;
        padding: 5px 0;
    }
}

.bg_dark {
    .c_select {
        border-bottom: 2px solid $white;
        color: $white;
    }
}

.bg_white {
    .c_select {
        border-bottom: 2px solid $primary;
        color: $primary;
    }
}
</style>