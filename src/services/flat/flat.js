import { db } from '../firebase/firebase.js'
import { addDoc, collection } from 'firebase/firestore'

export class FlatService  {
    constructor() {

    }

    async createFlat(flat) {
        const flatsCollectionRef = collection(db, "Flats");
        try {
            const result = await addDoc(flatsCollectionRef, flat);
            return {data:{...flat, id:result.id}, message: 'flat created successfully'}
        }catch(error) {

        }
    }

}