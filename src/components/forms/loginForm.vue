<template>
    <Vueform v-model="formData" :endpoint="false" @submit="loginFormSubmit()">
        <GroupElement name="account_information" label="Identifiants">
            <TextElement name="username" placeholder="Email address" rules="required|email|max:255" :debounce="300" />
            <TextElement name="password" placeholder="Password" input-type="password" rules="required|max:255" :debounce="300"/>
        </GroupElement>
        <GroupElement name="form_actions">
            <ButtonElement name="submit" add-class="mt-2" submits :columns="6">Se connecter</ButtonElement>
            <p class="vf-col-6"><router-link to="/registration">Pas encore enregistré ?</router-link></p>
        </GroupElement>
    </Vueform>
</template>


<script>
import { useUserStore } from '@/scripts/stores/userStore'

export default {
    components: {

    },
    setup() {
        const userStore = useUserStore()
        return { userStore }
    },
    data() {
        return {
            formData: {}
        }
    },
    methods: {
        loginFormSubmit() {
            this.userStore.login(this.formData)
        }
    }
}
</script>

<style scoped></style>