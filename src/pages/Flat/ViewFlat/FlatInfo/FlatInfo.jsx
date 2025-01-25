import { useEffect, useState } from "react";
// Servicios
import { FlatService } from "../../../../services/flat/flat";
import { LocalStorageService } from "../../../../services/localStorage/localStorage";

export const FlatInfo = ({flatId}) => {
    
    const [edit, setEdit] = useState(false);

    // servicios
    const flatService = new FlatService();
    const localStorageService = new LocalStorageService();

    // Obtener el usuario loggeado
    const userlogged =localStorageService.getLoggedUser();

    const checkFlatOwner = async ()=> {
        const response = await flatService.getFlatbyId(flatId);
        if ( response.data.createdBy !== flatId) {
            setEdit(false);
            console.log('false');
        }else {
            setEdit(true);
        }
    }

    useEffect(()=> {
        checkFlatOwner();
    },[])

    return(
        <>
        { edit && (
            <h3>Edicion</h3>
        )}
        </>
    );
}