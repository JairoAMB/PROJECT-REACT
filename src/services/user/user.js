import { data } from 'react-router-dom';
import { db } from '../firebase/firebase.js'
import { collection, addDoc, query, getDocs, where, doc, getDoc, updateDoc, increment } from 'firebase/firestore'

export class UserService {
    constructor () {

    }

    async createUser (user) {
        const userCollectionRef = collection(db, "Users");
        const setQuery = query(userCollectionRef, where("email","==",user.email));
        try {
            const resultQuery = await getDocs(setQuery);
            if(resultQuery.empty) {
                const result = await addDoc( userCollectionRef, user );
                const { role, ...userWithoutRole } = user;

                return {data:{...userWithoutRole, id:result.id , password:''}, message: 'Usser created succesfully'}
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
                const { role, ...userWithoutRole } = userResult;
                const id = resultQuery.docs[0].id

                return {data:{...userWithoutRole, id:id, password:''} , message: 'User logged successfully.'}
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

        if (result.exists()) {
            const userData = result.data();
            // Eliminar 'role' antes de retornar la data
            const { role, ...userWithoutRole } = userData;
            return { data:{...userWithoutRole, id:id, password:''} };
        }else {
            return { data: null, message: 'User not found' };
        }
    }

    async updateUser (user, id) {
        const userDocRef = doc(db, 'Users', id);
        if (user.password === '') {
            delete user.password;
        }

        await updateDoc(userDocRef, user);

        const { role, ...userWithoutRole } = user;

        return {data: {...userWithoutRole, id, password:''}, message: 'usser updated successfully'}
    }

    async addFlatUser(userLoggedId) {
        try {
            const userDocRef = doc(db, "Users", userLoggedId);
            const userSnapshot = await getDoc(userDocRef);
    
            if (!userSnapshot.exists()) {
                console.error(`Usuario con ID ${userLoggedId} no encontrado.`);
                return;
            }
    
            await updateDoc(userDocRef, {
                numberOfFlats: increment(1) // Incrementa en 1 el número de flats
            });
    
            console.log("numberOfFlats actualizado correctamente.");
        } catch (error) {
            console.error("Error al actualizar numberOfFlats:", error);
        }
    }

    async minusFlatUser(userLoggedId) {
        try {
            const userDocRef = doc(db, "Users", userLoggedId);
            const userSnapshot = await getDoc(userDocRef);
    
            if (!userSnapshot.exists()) {
                console.error(`Usuario con ID ${userLoggedId} no encontrado.`);
                return;
            }
    
            const currentNumberOfFlats = userSnapshot.data().numberOfFlats || 0;
    
            if (currentNumberOfFlats > 0) {
                await updateDoc(userDocRef, {
                    numberOfFlats: increment(-1) // Disminuye en 1
                });
    
                console.log("numberOfFlats disminuido correctamente.");
            } else {
                console.warn("El usuario no tiene flats para eliminar.");
            }
        } catch (error) {
            console.error("Error al disminuir numberOfFlats:", error);
        }
    }

    async getUsers () {
        const usersCollectionRef = collection(db, 'Users');
        const setQuery = query(usersCollectionRef);

        try{
            const resultQuery = await getDocs(setQuery);
            const users = resultQuery.docs.map((doc)=>({...doc.data(), id:doc.id}));
            return {data: users, message:'users gotten successfully'}
        }catch(error){
            return {data: null, message: 'Error getting users' };
        }
    }

    async getAllUsers (filters) {
        const usersCollectionRef = collection(db, 'Users');
        const conditions = [];

        if (filters.role !== null) {
            conditions.push(where("role", "==", filters.role));
        }

        // Filtrar por rango de edad (convirtiendo edad a fecha de nacimiento)
        const currentYear = new Date().getFullYear();

        if (filters.minAge !== null) {
            const minBirthDate = new Date(currentYear - filters.minAge, 11, 31); // Último día del año límite
            conditions.push(where("birthDate", "<=", minBirthDate));
        }
        if (filters.maxAge !== null) {
            const maxBirthDate = new Date(currentYear - filters.maxAge, 0, 1); // Primer día del año límite
            conditions.push(where("birthDate", ">=", maxBirthDate));
        }

        if (filters.minFlats !== null) {
            conditions.push(where("numberOfFlats", ">=", filters.minFlats));
        }
        if (filters.maxFlats !== null) {
            conditions.push(where("numberOfFlats", "<=", filters.maxFlats));
        }

        const setQuery = query(usersCollectionRef, ...conditions);

        try{
            const resultQuery = await getDocs(setQuery);
            const users = resultQuery.docs.map((doc)=>({...doc.data(), id:doc.id}));
            return {data: users, message:'users gotten successfully'}
        }catch(error){
            return {data: null, message: 'Error getting users' };
        }
    }

    async checkAdminUser (userLoggedId) {
        const userDocRef = doc(db, 'Users', userLoggedId);
        const result = await getDoc(userDocRef);

        if(result.exists()){
            const userData = result.data();
            if ( userData.role === 'admin') {
                return true;
            }else {
                return false
            }
        } 

        return null; 
        
    }

}