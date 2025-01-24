import { data } from 'react-router-dom';
import { db } from '../firebase/firebase.js'
import { collection, addDoc, query, getDocs, where, doc, getDoc, updateDoc } from 'firebase/firestore'

export class UserService {
    constructor () {

    }

    async createUser (user) {
        const userCollectionRef = collection(db, "Users");
        const setQuery = query(userCollectionRef, where("email","==",user.email));
        try {
            const resultQuery = await getDocs(setQuery);
            if(resultQuery.empty) {
                const result = await addDoc( userCollectionRef, user )
                return {data:{...user, id:result.id , password:''}, message: 'Usser created succesfully'}
            }else {
                return {data: null, message: 'User already exists' };
            }

        }catch(error) {
            return {data: null, message: 'Error creating user'};
        }
    }

    async login({email, password}) {
        const userCollectionRef = collection(db, "Users");
        const setQuery = query(userCollectionRef, where("email","==",email), where("password", "==", password));
        try{
            const resultQuery = await getDocs(setQuery);
            if(!resultQuery.empty){
                const userResult = resultQuery.docs[0].data();
                const id = resultQuery.docs[0].id
                return {data:{...userResult, id:id, password:''} , message: 'User logged successfully.'}
            }else {
                return {data: null, message: 'Incorrect email or password' };
            }
        }catch(error){
            return {data: null, message: 'Incorrect email or password'};
        }
    }

    async getUser(id) {
        const userDocRef = doc(db, 'Users', id);
        const result = await getDoc(userDocRef);
        return {data: result.data()}
    }

    async updateUser (user, id) {
        const userDocRef = doc(db, 'Users', id);
        if (user.password === '') {
            delete user.password;
        }

        await updateDoc(userDocRef, user);
        return {data: {...user, id, password:''}, message: 'usser updated successfully'}
    }

}