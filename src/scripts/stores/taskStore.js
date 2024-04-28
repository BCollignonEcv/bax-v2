import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

import { taskFirebaseService } from '@/scripts/services/firebase/taskFirebaseService'

import * as logHelpers from '@/scripts/helpers/logHelpers'

import { useUserStore } from '@/scripts/stores/userStore'

export const useTaskStore = defineStore({
    id: 'tasks',
    state: () => ('tasks', {
        _isInitialize: false,
        _tasks: {},
        _appID: null
    }),
    getters: {
        // GET
        getTask(state) {
            return (id) => {
                return state._tasks[id]
            }
        },
        getTasks(state) {
            return state._tasks
        },

        appID(state) {
            if(state._appID) {
                return state._appID;
            } else {
                const userStore = useUserStore();
                return userStore._appID;
            }
        },

        // IS
        isInitialize(state) {
            return state._isInitialize
        },

        // HAS
        hasTasks(state) {
            return state._tasks.length > 0;
        },
        hasTask(state) {
            return (id) => {
                return getTask(id) != null;
            }
        },
    },
    actions: {
        async initialize() {
            const userStore = useUserStore();
            if (userStore.isAuthenticated && !this._isInitialize) {
                logHelpers.writeLog('PINIA TaskStore - Initialisation', '', 'INFO')
                await this.request_getTaskList();
                logHelpers.writeLog('PINIA TaskStore - Initialisation success', '', 'SUCCESS')
                this._isInitialize = true;
            }
        },
        async request_getTaskList(){
            let response = await taskFirebaseService.getTasks(this.appID);
            if(!response.error) {
                this._tasks = response;
            }
        },
        async request_postTask(task){
            let response = await taskFirebaseService.postTask(this.appID, task);
            if(!response.error) {
                this._tasks[response.id] = response;
            }
        },
        async request_validateTask(taskID) {
            const userStore = useUserStore();
            let response = await taskFirebaseService.postTaskHistory(this.appID, taskID, {username: userStore._username, userID: userStore._uid})
            if(!response.error) {
                this._tasks[taskID] = response;
            }
        },
        async request_requireTask(taskID) {
            let task = this.getTask(taskID);
            task.required = true;
            let response = await taskFirebaseService.patchTask(this.appID, task);
            if(!response.error) {
                this._tasks[taskID] = response;
            }
        },
        async request_removeTask(taskID) {
            let response = await taskFirebaseService.deleteTask(this.appID, taskID);
            if(!response.error) {
                delete this._tasks[taskID];
            }
        },
    }
})

/**
 * TODO | REMARQUE
 * 
 * Si les temps de réponse sont trop élever, 
 * on peut modifier directement _tasks au lieu de faire appel à request_getAllTasks() 
 * pour mettre à jours _tasks
 */