<template>
    <p :class="classObject">
        <slot></slot>
    </p>
</template>

<script>
export default {
    props: {
        size: {
            type: String,
            default: 'Default'
        },
        color: {
            type: String,
            default: 'Default'
        },
        padding: {
            type: Object,
            default: function () {
                return { 
                    left: false, 
                    rigth: false, 
                    bottom: false, 
                    top: false,
                    all: false 
                }
            }
        },
    },
    data () {
        return {
            allowedClass: {
                size: ['Default', 'large', 'medium', 'small', 'super'],
                color: ['Default', 'primary', 'secondary', 'tertiary', 'correct', 'error'],
            }
        }
    },
    computed: {
        classObject() {
            let customClassObject = [];
            for(const [key, value] of Object.entries(this.$props)) {
                if(value != "Default"){
                    if(this.allowedClass[key] && this.allowedClass[key].includes(value)){
                        customClassObject.push(`text-${value}`);
                    }
                }
            }
            for(const [key, value] of Object.entries(this.padding)) {
                if(value){
                    customClassObject.push(`p-${key}`);
                }
            }
            return customClassObject;
        }
    },
}
</script>

<style lang="scss" scoped>

$padding: var(--m-3);

    p{
        font-weight: 100;
        &.text{
                // &-super{
                //     @include font-secondary;
                //     font-weight: 700;
                //     font-size: calc(var(--fs-1) * 2);
                //     line-height: 7rem;
                // }

                &-large{
                    font-size: var(--fs-1);
                    line-height: var(--fs-1);
                }

                &-medium{
                    font-size: var(--fs-2);
                }

                &-small{
                    font-size: var(--fs-3);
                    line-height: var(--fs-3);
                }

                &-primary{
                    color: var(--c-1);
                }

                &-secondary{
                    color: var(--c-2);
                }

                &-tertiary{
                    color: var(--c-5);
                }

                &-error{
                    color: var(--c-3);
                }

                &-correct{
                    color: var(--c-4);
                }
            }

            &.p{
                &-left{
                    padding-left: $padding;
                }

                &-right{
                    padding-right: $padding;
                }

                &-top{
                    padding-top: $padding;
                }

                &-bottom{
                    padding-bottom: $padding;
                }

                &-all{
                    padding: $padding;
                }
            }
    }
    
</style>