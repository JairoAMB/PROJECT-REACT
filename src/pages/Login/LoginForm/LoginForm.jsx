import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Password } from 'primereact/password';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { UserService } from "../../../services/user/user";
import { LocalStorageService } from "../../../services/localStorage/localStorage";


export const LoginForm = () => {
    // referencias a los inputs
    const emailRef = useRef();
    const [password, setPassword] = useState('');
    const navigation = useNavigate();

    // instancias del servicio user y localStorage
    const userService = new UserService();
    const localstorageService = new LocalStorageService();
    
    // funcion submit
    const submit = async(event) => {
        event.preventDefault();
        const usserLogged = {
            email: emailRef.current?.value,
            password: password,
        }
        // metodo para loggear al usuario en firebase y localstorage
        const result = await userService.login(usserLogged);
        if( result.data != null ) {
            localstorageService.addLoggedUser(result.data);
            navigation('/')
            alert(result.message);
        } else {
            alert(result.message);
        }
    }
    
    return(
        <>
            <form onSubmit={(event) => submit(event)} className="mt-4 w-11/12 flex flex-col gap-8 items-center">
                {/* input email */}
                <FloatLabel className="flex flex-col justify-center items-center">
                    <InputText id="email" keyfilter="email" className="w-[276px]" ref={emailRef} type={'email'} required/>
                    <label htmlFor="email" className="font-bold mb-2"> Email </label>
                    <small id="email-help" className="mt-2 font-Opensans text-text_danger text-xs hidden">
                        Enter your username to reset your password.
                    </small>
                </FloatLabel>     
                {/* input password */}
                <FloatLabel className="flex flex-col justify-center items-center">
                    <Password inputId="password" value={password} onChange={(e) => setPassword(e.target.value)} required toggleMask/>
                    <label htmlFor="password" className="font-bold mb-2">Password</label>
                    <small id="password-help" className="mt-2 font-Opensans font-normal text-text_danger text-xs hidden">
                        Enter your username to reset your password.
                    </small>
                </FloatLabel>
                <Button type={'submit'} label="Log In" />
            </form>
        </>
    );
}