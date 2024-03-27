<template>
    <Vueform>
        <GroupElement name="personal_information" label="Personal information">
            <TextElement name="firstname" placeholder="First name" rules="required" :columns="6" />
            <TextElement name="lastname" placeholder="Last name" rules="required" :columns="6" />
        </GroupElement>
        <GroupElement name="account_information" label="Account information">
            <TextElement name="email" placeholder="Email address" rules="required|email|max:255" :debounce="300" />
            <TextElement name="password" input-type="password" placeholder="Password" :rules="[
                'required',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/',
                'confirmed'
            ]" :debounce="300" :messages="{
                regex: 'The Password must at least 8 characters long and contain at least one number, one uppercase and one lowercase character.'
            }" />
            <TextElement name="password_confirmation" input-type="password" placeholder="Password again"
                rules="required" />
        </GroupElement>
        <GroupElement>
            <ButtonElement name="submit" add-class="mt-2" submits :columns="6">Créer mon compte</ButtonElement>
            <p class="vf-col-6"><router-link to="/login">Déjà enregistré ?</router-link></p>
        </GroupElement>
    </Vueform>
</template>


<script>

export default {
    components: {
        
    },
    data() {
        return {}
    }
}
</script>

<style scoped></style>