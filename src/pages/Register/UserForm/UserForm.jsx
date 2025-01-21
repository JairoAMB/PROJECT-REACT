// React Hooks
import React , { useRef, useState } from "react";
// Libreria de componentes
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
// importar los servicios de usario para crear usuario en firebase
import { UserService } from "../../../services/user/user";


export const UserForm = () => {
    // Referencias a los inputs
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const birthDateRef = useRef();
    const emailRef = useRef();

    // instancia de la clase UserService
    const userService = new UserService();

    // Mensaje para password
    const footer = (
        <>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>At least one special character</li>
                <li>At least one numeric character</li>
                <li>Minimum 6 characters</li>
            </ul>
        </>
    );

    // funcion para manejar el submit del formulario
    const submit = async (event) => {
        event.preventDefault();
        
        // creacion del objeto usario
        const newUser = {
            firsName: firstNameRef.current?.value,
            lastName: lastNameRef.current?.value,
            birthDate: birthDateRef.current?.value,
            email: emailRef.current?.value,
            password: password,
        }
        
        // Guardar informacion en firebase
        const result = await userService.createUser(newUser);
        // console.log('result',result)
    }

  return (
    <>
      <form className="mt-3 w-11/12 flex flex-col gap-7 items-center" onSubmit={(event)=> submit(event)}>
        <FloatLabel>
          <InputText className="w-[276px]" id="first-name" ref={firstNameRef} type={'text'} required/>
          <label htmlFor="first-name">First Name</label>
        </FloatLabel>
        <FloatLabel>
          <InputText className="w-[276px]" id="last-name" ref={lastNameRef} type={'text'} required/>
          <label htmlFor="last-name">Last Name</label>
        </FloatLabel>
        <FloatLabel>
            <Calendar className="w-[276px]" inputId="birth-date" inputRef={birthDateRef} type={'date'} required/>
            <label htmlFor="birth-date">Birth Date</label>
        </FloatLabel>
        <FloatLabel>
          <InputText className="w-[276px]" id="email" ref={emailRef} type={'email'} required/>
          <label htmlFor="email">Email</label>
        </FloatLabel>
        <FloatLabel>
            <Password inputId="password" value={password} onChange={(e) => setPassword(e.target.value)} footer={footer} type={'password'} required toggleMask/>
            <label htmlFor="password">Password</label>
        </FloatLabel>
        <FloatLabel>
            <Password inputId="confirm-password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} footer={footer} type={'password'} required toggleMask/>
            <label htmlFor="confirm-password">Password</label>
        </FloatLabel>
        <Button type={'submit'} label="Register" />
      </form>
    </>
  );
};






        

        




        
        







        


 



        
