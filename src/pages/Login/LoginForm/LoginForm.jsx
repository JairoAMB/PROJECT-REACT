import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Password } from 'primereact/password';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Swal from 'sweetalert2'; // Importar SweetAlert
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

        const email = emailRef.current?.value;
        const pass = password;

        // Verificar si el email está vacío
        if (!email) {
            Swal.fire({
                icon: 'error',
                title: 'Email is required',
                text: 'Please enter your email address.',
            });
            return;
        }

        // Verificar si el formato del email es válido
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Email',
                text: 'Please enter a valid email address.',
            });
            return;
        }

        // Verificar si la contraseña está vacía
        if (!pass) {
            Swal.fire({
                icon: 'error',
                title: 'Password is required',
                text: 'Please enter your password.',
            });
            return;
        }

        const usserLogged = {
            email: email,
            password: pass,
        }

        // metodo para loggear al usuario en firebase y localstorage
        const result = await userService.login(usserLogged);
        if(result.data != null) {
            localstorageService.addLoggedUser(result.data);
            navigation('/');
            Swal.fire({
                icon: 'success',
                title: 'Welcome!',
                text: result.message,
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: result.message,
            });
        }
    }

    return(
        <>
            <form onSubmit={(event) => submit(event)} className="mt-4 w-11/12 flex flex-col gap-8 items-center">
                {/* input email */}
                <FloatLabel className="flex flex-col justify-center items-center">
                    <InputText id="email" keyfilter="email" className="w-[276px]" ref={emailRef} type={'email'} />
                    <label htmlFor="email" className="font-bold mb-2"> Email </label>
                </FloatLabel>     
                {/* input password */}
                <FloatLabel className="flex flex-col justify-center items-center">
                    <Password inputId="password" value={password} onChange={(e) => setPassword(e.target.value)}  toggleMask/>
                    <label htmlFor="password" className="font-bold mb-2">Password</label>
                </FloatLabel>
                <Button type={'submit'} label="Log In" />
            </form>
        </>
    );
}
