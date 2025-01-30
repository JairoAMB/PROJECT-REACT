import React from 'react'; 
import { useEffect, useState } from 'react';
import profile from '../../../../assets/Img/profile.jpg'
import { useNavigate } from 'react-router-dom';
// servicios
import { ImagesService } from '../../../../services/apiImages/apiImages';
import { LocalStorageService } from '../../../../services/localStorage/localStorage';
import { UserService } from '../../../../services/user/user';
// libreria de componentes
import { Button } from 'primereact/button';

export const ProfileCard = ({ id }) => {

    const [profileImage, setProfileImage] = useState(null);
    const [edit, setEdit]= useState(false);
    const navigation = useNavigate();
    const [user, setUser] = useState({
      firstName: '',
      lastName: '',
      birthDate: '',
      email: '',
    });

    // servicios
    const localStorageService = new LocalStorageService();
    const userService = new UserService();
    const imagesService = new ImagesService();

    // Obtener el usuario loggeado
    const userlogged =localStorageService.getLoggedUser();

    const getUser = async () => {
        const resultUser = await userService.getUser(id);
        if (resultUser.data === null) {
            navigation('/');
        }
        setUser(resultUser.data);
    }

    // Verificacio de usuario
    const checkUser = () => {
        if ( id === userlogged.id ) {
            setEdit(true);
            setUser(userlogged);
        }else{
            setEdit(false);
            getUser();
        }
    }

    // obtener imagen de portada axios
    const getProfileImage = async() => {
        const response = await imagesService.profileImage();
        setProfileImage(response);
    }

    // Formatear la fecha de nacimiento
    const formatBirthDate = (date) => {
        if (!date) return 'Fecha no disponible';

        if ( typeof(date) === 'object'  ) {
            const newdate = new Date(date.seconds*1000);
            return new Intl.DateTimeFormat('es-ES', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            }).format(newdate);
        }

        const newdate = new Date(date);
        return new Intl.DateTimeFormat('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }).format(newdate);
    };

    const handleNavigate = () => {
        navigation(`/update-profile/${id}`);
    };

    useEffect(()=>{
        checkUser();
        getProfileImage();
    },[]);

    return(
        <>  
        <div className='absolute top-20 w-11/12 py-10 px-2 backdrop-blur-3xl drop-shadow-[0_0_8px_rgba(0,0,0,0.25)] rounded-3xl sm:relative sm:py-0 sm:top-0'>
            <div className="relative mx-auto w-11/12 py-5 flex flex-col justify-center items-center gap-4 sm:flex-row sm:gap-9">
                {edit && (
                    <div className="absolute z-10 top-2 right-4 sm:hidden">
                        <i className="pi pi-pen-to-square" onClick={handleNavigate}></i>
                    </div>
                )}
                <div className='flex flex-col items-center gap-3'>
                    <div id="img-perfil" className="">
                        <img src={profileImage ? profileImage: profile} alt="Imangen de perfil" className="w-28 h-28 border-4 rounded-3xl object-cover sm:w-36 sm:h-36"/>
                    </div>
                    <span className='text-secondary_text hidden sm:block'>{ user.email }</span>
                </div>
                <div className='max-w-[550px] px-2 bg-bg_color_primary/50 rounded-xl py-5 mb-10 flex flex-col items-center w-full gap-2 '>
                    <span className='sm:self-start sm:ml-2 text-primary_text font-Montserrat font-bold text-xl'>Account Details</span>
                    <div className='w-full flex justify-center sm:justify-between items-center'>
                        <span className='hidden sm:inline-block sm:ml-2'><i className="pi pi-user mr-2"></i>Name:</span>
                        <span className='text-primary_text font-Montserrat font-bold text-2xl sm:font-normal sm:text-lg'>{`${user.firstName} ${user.lastName}`}</span>
                    </div>

                    <div className='w-full flex justify-center sm:justify-between items-center'>
                        <span className='hidden sm:inline-block sm:ml-2'><i className="pi pi-calendar-clock mr-2"></i>Birth Date:</span>
                        <span className='font-Lora'>{formatBirthDate(user.birthDate)}</span>
                    </div>
                    <span className='font-Lora text-secondary_text text-sm sm:hidden'>{user.email}</span>
                    {edit && (
                        <Button label="Edit" className='hidden sm:block mt-3 px-12' onClick={handleNavigate}/>
                    )}
                </div>
            </div>
        </div>

        </>
    );
}




