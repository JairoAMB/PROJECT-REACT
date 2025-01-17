import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase/firebase.js'

export class UserService {
    constructor () {

    }

    async createUser (user) {
        const userCollectionRef = collection(db, "Users")
        try {
            await addDoc( userCollectionRef, user )
            return 1
        }catch {

        }
    }

    async login(email, password) {

        const userCollectionRef = collection(db, "Users");
        const setQuery = query(userCollectionRef, where("email", "==", email),where("password", "==", password));
        try{
            const resultQuery = await getDocs(setQuery);
            if (!resultQuery.empty) {
                const userResult = resultQuery.docs[0].data();
                return {data: {...userResult,password:''}, message: 'User login successfully.'};
            }else{
                return {data: null, message: 'Incorrect email or password'};
            }
        }catch (error) {
            return {data: null, message: 'Incorrect email or password'};
        }
      

    }

}