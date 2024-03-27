import { doc, getDoc, getDocs, addDoc, setDoc, deleteDoc, collection, query, orderBy, limit, serverTimestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { db, auth } from "./firebaseService.js";

/*************************************
************** SERVICES **************
*************************************/
const userFirebaseService = {
    register: async (user) => {
        // Create user in firebase
        // createUserWithEmailAndPassword(auth, user.username, user.password).then(authentificationResponse => {
        //     user.id = authentificationResponse.user.uid;
        //     setDoc(doc(db, "users", user.id), user.toSave).then(response => {
        //         console.log(response)
        //         return user;
        //     })
        // }) 

    },

    login: async (user) => {
        // Authentificate user in firebase
        let userAuthInstance = await signInWithEmailAndPassword(auth, user.username, user.password)
        if (userAuthInstance) {
            // Get user informations in database
            let userDocSnapshot = await getDoc(doc(db, "users", userAuthInstance.user.uid))
            if(userDocSnapshot.exists()){
                return { ...userDocSnapshot.data(), uid: userAuthInstance.user.uid};
            }            
        } else {
            throw new Error('Unable to login user')
        }
    },

    logout: async () => {
        signOut(auth).then(() => {
            return
        }).catch((error) => {
            throw new Error('Unable to disconnect user :', error)
        });
    }
}

/**************************************
 ************ CONVERTERS **************
 *************************************/

 // TODO Ajouter des converter

export {
    userFirebaseService
}