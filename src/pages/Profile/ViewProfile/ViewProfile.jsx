import { ProfileCard } from "./ProfileCard/ProfileCard";
import { CoverImage } from "../components/CoverImage/CoverImage";
import { useParams } from "react-router-dom";
// servicios
import { LocalStorageService } from "../../../services/localStorage/localStorage";

export const ViewProfile = () => {
    // obtener el id de la url 
    let { id } = useParams();

    // instancia del servicio de localstorage y apiImages
    const localStorageService = new LocalStorageService();

    if (!id) {
        const userlogged =localStorageService.getLoggedUser();
        id = userlogged.id;
    }

    return(
        <>
            <div className="bg-bg_color_primary relative w-full h-screen max-w-[1440px] m-auto flex flex-col  items-center">
                <CoverImage/>
                {/* <ProfileCard id={ 'UMhEGVKeItYHYy8cGFX2' }/> */}
                <ProfileCard id={ id }/>
            </div>
        </>
    );
}