<template>
    <header>
        <div class="header-container">
            <c_sideFrame ref="sideFrame">
                <template v-slot:trigger>
                    <c_icon :_name="'menu'" _size="big" _color="white"></c_icon>
                </template>
                <template v-slot:title>
                    <h5>Menu</h5>
                </template>
                <template v-slot:content>
                    <div class="c_header-links">
                        <p class="c_header-link" v-for="link in links">
                            <router-link :to="link.url" @click="closeSideFrame">{{ link.label }}</router-link>
                        </p>
                    </div>
                </template>
                <template v-slot:footer>
                    <c_iconText :_name="'logout'" @click="logout()">Me déconnecter</c_iconText>
                </template>
            </c_sideFrame>
            <c_icon :_name="'bax'" _size="normal" _color="white"></c_icon>
        </div>
    </header>
</template>

<script>
import { useUserStore } from '@/scripts/stores/userStore'

export default {
    setup() {
        const userStore = useUserStore()
        return { userStore }
    },
    data() {
        return {
            links: [
                { url: '/', label: 'Accueil' },
                { url: '/menus', label: 'Menus' },
                { url: '/tasks', label: 'Tâches' },
                { url: '/account', label: 'Mon compte' },
            ]
        }
    },
    methods: {
        logout() {
            this.closeSideFrame();
            this.userStore.logout();
        },
        closeSideFrame() {
            if (this.$refs.sideFrame) {
                this.$refs.sideFrame.toggleFrame();
            }
        }
    }
}
</script>

<style scoped lang="scss">
header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--header-size);
    z-index: 100;
    background-color: var(--c-2-25);
    display: flex;
    align-items: center;
    padding: var(--m-4);
    gap: 1rem;
    justify-content: space-between;

    .header-container {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .c_header-links {
        .c_header-link {
            padding: var(--m-5) 0;
        }
    }
}
</style>