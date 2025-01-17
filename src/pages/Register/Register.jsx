// IMagen svg logo
import { Imagotipo1 } from "../../assets/svg/Imagotipo1"
// componente formulario
import { UserForm } from "./UserForm/UserForm"

export const Register = () => {
    return(
        <>
            <div className="relative ">
                <div className="max-w-[1440px] w-full h-screen bg-register bg-cover bg-center m-auto"></div>
                <div className="absolute inset-0 flex justify-center items-center overflow-auto">
                    <section className="w-11/12 min-w-[310px] max-w-[700px] max-h-[95vh] overflow-hidden hover:overflow-auto bg-gradient-to-br from-[#E7E7E7]/50 to-[#E7E7E7]/20 border border-white/60 drop-shadow-[0_35px_35px_rgba(0,0,0,0.07)] backdrop-blur-lg flex flex-col items-center py-5 gap-4 rounded-2xl">
                        <Imagotipo1 />
                        <span className="font-Montserrat font-bold text-primary_text text-xl"> Create an account </span>
                        <UserForm />
                        <div className="flex flex-col items-center">
                            <span className="text-secondary_text_white font-Opensans font-normal text-xs md:text-secondary_text">Already have an Account?</span>
                            <a href="/" target="_blank" rel="noopener noreferrer" className="text-primary_text_white hover:opacity-55 md:text-primary_text">Sign In</a>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}



        