import { doc, getDoc, getDocs, addDoc, setDoc, deleteDoc, collection, query, orderBy, limit, serverTimestamp, updateDoc, runTransaction } from "firebase/firestore";
import { db, auth } from "./firebaseService.js";

import * as logHelpers from '@/scripts/helpers/logHelpers'

import { Task } from '@/scripts/class/Task.js';

/*************************************
**************** CRUD ****************
*************************************/

const taskFirebaseService = {
    getTasks: async (_appID) => {
        try {
            // Création de la référence vers la collection history (baxApp/*/tasks)
            const taskCollectionRef = collection(doc(db, "baxApp", _appID), "tasks").withConverter(taskConverter)
            // Recupération du snapshot avec les documents de la collection tasks
            const querySnapshot = await getDocs(taskCollectionRef);

            // Itération sur chaque document tasks récupérées
            let tasks = {}
            await Promise.all(querySnapshot.docs.map(async (taskDoc) => {
                // Récupération des données du document task
                let task = await taskDoc.data();
                tasks[task.id] = task;
            }));

            logHelpers.writeLog('GET /tasks', '', 'SUCCESS')
            return tasks
        } catch (error) {
            logHelpers.writeLog('GET /tasks', '', 'ERROR')
            console.error(error)
            return { error: true }
        }
    },
    getTask: async (_appID, taskID) => {
        try {
            // Création de la référence vers le document task (baxApp/*/tasks/*)
            const taskRef = doc(db, "baxApp", _appID, "tasks", taskID).withConverter(taskConverter)
            // Recupération du snapshot avec le document task
            const snapshot = await getDoc(taskRef);

            logHelpers.writeLog('GET /task', '', 'SUCCESS')
            return await snapshot.data();
        } catch (error) {
            logHelpers.writeLog('GET /task', '', 'ERROR')
            console.error(error)
            return { error: true }
        }
    },
    postTask: async (_appID, task) => {
        try {
            // Création de la référence vers la collection history (baxApp/*/tasks)
            const taskCollectionRef = collection(db, "baxApp", _appID, 'tasks').withConverter(taskConverter)

            // Ajout du document dans la collection tasks
            let docRef = await addDoc(taskCollectionRef, task);

            logHelpers.writeLog('POST /task', '', 'SUCCESS')
            return await taskFirebaseService.getTask(_appID, docRef.id)
        } catch (error) {
            logHelpers.writeLog('POST /task', error, 'ERROR')
            return { error: true }
        }
    },
    patchTask: async (_appID, task) => {
        try {
            await updateDoc(doc(db, "baxApp", _appID, 'tasks', task.id), taskConverter.toFirestore(task));
            logHelpers.writeLog('PATCH /task', '', 'SUCCESS');
            return await taskFirebaseService.getTask(_appID, task.id);
        } catch (error) {
            logHelpers.writeLog('PATCH /task', error, 'ERROR')
            return { error: true }
        }
    },
    deleteTask: async (_appID, taskID) => {
        try {
            // Création de la référence vers le document task (baxApp/*/tasks/*)
            const taskDocRef = doc(db, "baxApp", _appID, "tasks", taskID);
            // Suppression du document task (baxApp/*/tasks/*)
            await deleteDoc(taskDocRef);
            logHelpers.writeLog('DELETE /task', '', 'SUCCESS')
            return { success: true }
        } catch (error) {
            logHelpers.writeLog('DELETE /task', error, 'ERROR')
            return { error: true }
        }
    },
    postTaskHistory: async (_appID, taskID, history) => {
        try {
            await runTransaction(db, async (transaction) => {
                // Mettre à jour la tâche (task)
                transaction.update(doc(db, "baxApp", _appID, 'tasks', taskID), { required: false });

                // Création d'un nouveau document dans la collection history
                const newHistoryDocRef = doc(collection(db, "baxApp", _appID, "tasks", taskID, "history")).withConverter(historyConverter);
                transaction.set(newHistoryDocRef, history);
            });

            logHelpers.writeLog('POST /task/*/history', '', 'SUCCESS')
            return await taskFirebaseService.getTask(_appID, taskID);
        } catch (error) {
            logHelpers.writeLog('POST /task/*/history', error, 'ERROR')
            return { error: true }
        }
    },
    getTaskHistoryByTaskRef: async (taskRef) => {
        try {
            // Création de la référence vers la task récupéré (baxApp/*/tasks/*)
            taskRef = doc(db, taskRef)

            // Création de la référence vers la collection history (baxApp/*/tasks/*/history)
            const historyCollectionRef = collection(taskRef, "history").withConverter(historyConverter);

            // Recupération du snapshot avec les documents de la collection history presente dans le document task
            const historyQuerySnapshot = await getDocs(query(historyCollectionRef, orderBy('date', 'desc'), limit(5)));

            logHelpers.writeLog('GET /task/*/history', '', 'SUCCESS')

            // Recupération du snapshot avec les documents de la collection history presente dans le document task puis des données
            return historyQuerySnapshot.docs.map(historyDoc => historyDoc.data())
        } catch (error) {
            logHelpers.writeLog('GET /task/*/history', error, 'ERROR')
            return { error: true }
        }
    }
}

/**************************************
 ************ CONVERTERS **************
 *************************************/

const taskConverter = {
    toFirestore: function (task) {
        return {
            label: task.label,
            periodicity: task.periodicity,
            subtasks: task.subtasks,
            required: task.required,
        };
    },
    fromFirestore: async function (snapshot, options) {
        let data = snapshot.data(options);

        // Recupération de l'history de la task
        data.history = await taskFirebaseService.getTaskHistoryByTaskRef(snapshot.ref.path);

        // Calcule de la task
        data = new Task({ ...data, id: snapshot.id })

        return data;
    }
};

const historyConverter = {
    toFirestore: function (occurence) {
        return {
            user: {
                userID: occurence.userID,
                username: occurence.username,
            },
            date: serverTimestamp()
        };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);

        return {
            userID: data.user.userID,
            username: data.user.username,
            date: data.date.toDate()
        };
    }
};

export {
    taskFirebaseService
} 
