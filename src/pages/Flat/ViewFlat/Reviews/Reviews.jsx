import { useEffect, useState } from "react";
import { ImagesService } from "../../../../services/apiImages/apiImages";

export const Reviews = () => {
    // servicio
    const imagesService = new ImagesService();
    // variable para guardar los comentarios e imagen 
    const [comments, setComments] = useState([]);
    const [profileImage, setProfileImage] = useState(null);

    const getReviews = async () => {
        const response = await imagesService.review();
        setComments(response);
    }

    // obtener imagen de portada axios
    const getProfileImage = async() => {
        const response = await imagesService.profileImage();
        setProfileImage(response);
    }

    useEffect(()=>{
        getReviews();
        getProfileImage();
    },[]);

    return(
        <>
            <div className="flex flex-col gap-2 md:flex-row overflow-x-auto ">
                {comments.map((comment)=>(
                    <div key={comment.id} className="flex flex-row min-w-[300px] max-w-[400px] gap-4 items-center border py-2 px-6 rounded-xl">
                        <div id="img-perfil" className="">
                            <img src={profileImage} alt="Imangen de perfil" className="w-20 h-16 border rounded-full object-cover"/>
                        </div>
                        <div className="w-full ">
                            <div className="flex flex-row justify-between mb-1">
                                <span className="text-primary_text font-Lora"> {comment.user.fullName}</span>
                                <span> <i className="pi pi-thumbs-up-fill" style={{ color: '#5cd5fb' }}></i> {comment.likes}</span>
                            </div>
                            <p className="text-secondary_text text-sm font-Opensans">{comment.body}</p>
                        </div>
                    </div>
                ))}
            </div>

        </>
    );
}

