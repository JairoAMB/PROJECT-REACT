import { db } from '../firebase/firebase.js'
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore'

export class FlatService  {
    constructor() {

    }

    async createFlat(flat) {
        const flatsCollectionRef = collection(db, "Flats");
        try {
            const result = await addDoc(flatsCollectionRef, flat);
            return {data:{...flat, id:result.id}, message: 'flat created successfully'}
        }catch(error) {
            return {data: null, message: 'Error creating flat' };
        }
    }

    async getFlatbyId(flatId) {
        const flatDocRef = doc(db, 'Flats', flatId);
        const result = await getDoc(flatDocRef);
        return {data: result.data()};
    }

    async updateFlat(flat, flatId) {
        const flatDocRef = doc(db, 'Flats', flatId);

        try{
            const result = await updateDoc(flatDocRef, flat);
            return {data:{...flat}, message: 'flat updated successfully'};

        }catch(error) {
            return {data: null, message: 'Error creating flat' };
        }


    }

}