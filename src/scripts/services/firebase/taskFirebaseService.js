import { doc, getDoc, getDocs, addDoc, setDoc, deleteDoc, collection, query, orderBy, limit, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, auth } from "./firebaseService.js";

import * as taskHelpers from '@/scripts/helpers/taskHelpers'
import * as logHelpers from '@/scripts/helpers/logHelpers'

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

            let tasks = {}

            // Itération sur chaque document task récupéré
            await Promise.all(querySnapshot.docs.map(async (taskDoc) => {

                // Récupération des données du document task
                let task = taskDoc.data();

                // Création de la référence vers la collection history (baxApp/*/tasks/*/history)
                const historyCollectionRef = collection(doc(db, "baxApp", _appID), "tasks", taskDoc.id, "history").withConverter(historyConverter);
                // Recupération du snapshot avec les documents de la collection history presente dans le document task
                const historyQuerySnapshot = await getDocs(query(historyCollectionRef, orderBy('date', 'desc'), limit(5)));

                // Recupération du snapshot avec les documents de la collection history presente dans le document task puis des données
                task.history = historyQuerySnapshot.docs.map(historyDoc => historyDoc.data())

                // Ajout de champs
                task = {
                    ...task,
                    ...taskHelpers.enhancedDBTask(task)
                };

                tasks[task.id] = task;
            }));

            logHelpers.writeLog('GET /tasks', 'SUCCESS')
            return tasks
        } catch (error) {
            logHelpers.writeLog('GET /tasks', 'ERROR')
            console.error(error)
            return { error: true}
        }
    },
    postTask: async (_appID, task) => {
        try {
            logHelpers.writeLog('POST /task', 'SUCCESS')
        } catch (error) {
            logHelpers.writeLog('POST /task', 'ERROR')
            return { error: true}
        }
    },
    patchTask: async (_appID, task) => {
        try {
            // Format task before update
            task = taskConverter.toFirestore(task)

            await updateDoc(doc(db, "baxApp", _appID, 'tasks', task.id), task);
            logHelpers.writeLog('PATCH /task', 'SUCCESS')
        } catch (error) {
            logHelpers.writeLog('PATCH /task', 'ERROR')
            console.log(error)
            return { error: true}
        }
    },

    deleteTask: async (_appID, task) => {
        try {
            logHelpers.writeLog('DELETE /task', 'SUCCESS')
        } catch (error) {
            logHelpers.writeLog('DELETE /task', 'ERROR')
            return { error: true}
        }
    },

    postTaskHistory: async (_appID, task, history) => {
        try {
            // Création de la référence vers la collection history (baxApp/*/tasks/*/history)
            const historyCollectionRef = collection(db, "baxApp", _appID, 'tasks', task.id, 'history').withConverter(historyConverter)
            
            // console.log(taskConverter.toFirestore(history))
            // Ajout du document dans la collection history
            await addDoc(historyCollectionRef, history);

            // task.history.push(history)

            logHelpers.writeLog('POST /task/*/history', 'SUCCESS')

            // return task;
        } catch (error) {
            logHelpers.writeLog('POST /task/*/history', 'ERROR')
            console.log(error)
            return { error: true}
        }
    },
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
            require: task.require,
        };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);

        return {
            id: snapshot.id,
            label: data.label,
            periodicity: data.periodicity,
            require: data.require,
            subtasks: data.subtasks,
            // history: [],
        };
    }
};

const historyConverter = {
    toFirestore: function (occurence) {
        return {
            user: {
                userID: occurence.userID,
                username: occurence.username,
            },
            date: occurence.date ? occurence.date : serverTimestamp()
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
