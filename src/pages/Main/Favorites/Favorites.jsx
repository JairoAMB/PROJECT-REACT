import { useNavigate } from "react-router-dom";
import { FlatTable } from "../../../components/FlatTable/FlatTable";
// servicios
import { LocalStorageService } from "../../../services/localStorage/localStorage";

export const Favorites = () => {

    // variables de estado
    const navigation = useNavigate();

    // Servicios
    const localStorageService = new LocalStorageService();
    const userLogged = localStorageService.getLoggedUser();


    return(
        <>
            <div className="bg-bg_color_primary relative w-full h-full max-w-[1440px] m-auto flex flex-col  items-center">
                <h1>Favorites</h1>
                <FlatTable userLoggedId={userLogged.id}/>
            </div>
        </>
    );
}