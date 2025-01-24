import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserForm } from "../../../components/UserForm/UserForm";
import { CoverImage } from "../components/CoverImage/CoverImage";
import profile from '../../../assets/Img/profile.jpg';
// Servicios
import { LocalStorageService } from "../../../services/localStorage/localStorage";
import { ImagesService } from "../../../services/apiImages/apiImages";

export const UpdateProfile = () => {

    let { id } = useParams();
    const [profileImage, setProfileImage] = useState(null);
    
    // instancia del servicio de localstorage y apiImages
    const localStorageService = new LocalStorageService();
    const imagesService = new ImagesService();

    if ( !id ) {
        const userlogged =localStorageService.getLoggedUser();
        id = userlogged.id;
    }

    // obtener imagen de portada axios
    const getProfileImage = async() => {
        const response = await imagesService.profileImage();
        setProfileImage(response);
    }

    useEffect(()=>{
        getProfileImage();
    },[]);

    return(
        <>
            <div className="bg-bg_color_primary relative w-full h-screen max-w-[1440px] m-auto flex flex-col items-center">
                <CoverImage />
                <div className="relative w-11/12 max-w-[750px] pt-10 pb-4 mt-6 flex justify-center items-center border rounded-3xl drop-shadow-[0_35px_35px_rgba(0,0,0,0.07)] backdrop-blur-lg">
                    <div id="img-perfil" className="absolute -top-20 sm:-top-28">
                        <img src={profileImage ? profileImage: profile} alt="Imangen de perfil" className="w-28 h-28 border-4 rounded-3xl object-cover sm:w-36 sm:h-36"/>
                    </div>
                    <UserForm id={id}/>
                </div>
            </div>
        </>
    );
}