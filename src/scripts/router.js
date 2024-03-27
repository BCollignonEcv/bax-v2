import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/scripts/stores/userStore'
import { useTaskStore } from '@/scripts/stores/taskStore'

import Home from '@/pages/p_home'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '',
            name: 'Home',
            component: Home,
        },
        {
            path: '/menus',
            name: 'Menus',
            component: () =>
                import ('../pages/p_menus.vue'),
        },
        {
            path: '/tasks',
            name: 'Tasks',
            component: () =>
                import ('../pages/p_tasks.vue'),
        },
        {
            path: '/account',
            name: 'Account',
            component: () =>
                import ('../pages/p_account.vue'),
        },
        {
            path: '/registration',
            name: 'Registration',
            component: () =>
                import ('../pages/p_registration.vue'),
        },
        {
            path: '/login',
            name: 'Authentification',
            component: () =>
                import ('../pages/p_login.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/404'
        },
        {
            path: '/404',
            name: 'NotFound',
            component: () =>
                import ('../pages/p_notFound.vue')
        },
    ]
})

router.beforeEach(async (to, from, next) => {
    const taskStore = useTaskStore();
    if (!taskStore.isInitialize && (to.name === 'Home' || to.name === 'Tasks')) {
        taskStore.initialize()
    }
    next()
})

router.beforeEach(async (to, from) => {
    const userStore = useUserStore();
    if (!userStore.isAuthenticated && (to.name !== 'Authentification' && to.name !== 'Registration')) {
        return { name: 'Authentification' }
    }
})

export default router