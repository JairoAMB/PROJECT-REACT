import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Servicios
import { LocalStorageService } from "../../services/localStorage/localStorage";
import { UserService } from "../../services/user/user";
import { UsersTable } from "./UsersTable/UsersTable";

export const AllUsers = () => {
    // variables
    const navigate = useNavigate();
    // servicios
    const userService = new UserService();
    const localStorageService = new LocalStorageService();

    // obtengo el usuario loggeado
    const userLogged = localStorageService.getLoggedUser();

    const checkAdmin = async () => {
        const result = await userService.checkAdminUser(userLogged.id);
        if ( result === false || result === null ) {
            navigate('/');
        }
    }

    useEffect(()=> {
        checkAdmin();
    },[]);

    return(
        <>
            <UsersTable userLoggedId={userLogged.id}/>
        </>
    );
}