import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserForm } from "../../../components/UserForm/UserForm";
import { CoverImage } from "../components/CoverImage/CoverImage";
import profile from '../../../assets/Img/profile.jpg';
// Servicios
import { LocalStorageService } from "../../../services/localStorage/localStorage";
import { ImagesService } from "../../../services/apiImages/apiImages";

export const UpdateProfile = () => {
    const { id: paramId } = useParams();
    const navigate = useNavigate();
    const [userId, setUserId] = useState(paramId);
    const [profileImage, setProfileImage] = useState(null);

    // Instancia del servicio de localStorage y apiImages
    const localStorageService = new LocalStorageService();
    const imagesService = new ImagesService();

    useEffect(() => {
        const userLogged = localStorageService.getLoggedUser();

        // Si no hay usuario logueado, redirige a login
        if (!userLogged) {
            navigate("/login");
            return;
        }

        // Si no hay ID en la URL, usa el del usuario logueado
        if (!paramId) {
            setUserId(userLogged.id);
        }

        // Obtener imagen de perfil
        const getProfileImage = async () => {
            const response = await imagesService.profileImage();
            setProfileImage(response);
        };
        getProfileImage();
    },[]); 

    return (
        <div className="bg-bg_color_primary relative w-full h-screen max-w-[1440px] m-auto flex flex-col items-center">
            <CoverImage />
            <div className="relative w-11/12 max-w-[750px] pt-10 pb-4 mt-6 flex justify-center items-center border rounded-3xl drop-shadow-[0_35px_35px_rgba(0,0,0,0.07)] backdrop-blur-lg">
                <div id="img-perfil" className="absolute -top-20 sm:-top-28">
                    <img 
                        src={profileImage || profile} 
                        alt="Imagen de perfil" 
                        className="w-28 h-28 border-4 rounded-3xl object-cover sm:w-36 sm:h-36"
                    />
                </div>
                {userId && <UserForm id={userId} />}
            </div>
        </div>
    );
};
