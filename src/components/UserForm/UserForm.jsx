// React Hooks
import React , { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// Libreria de componentes
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
// importar los servicios de usario para crear usuario en firebase
import { UserService } from "../../services/user/user";
import { LocalStorageService } from "../../services/localStorage/localStorage";


export const UserForm = ({id}) => {
    // determinar si el formulario crea o visualiza usario
    let typeForm = 'create';
    if (id) {
      typeForm = 'update';
    }

    const navigation = useNavigate();
    // Referencias a los inputs
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const [date, setDate] = useState(null);
    const emailRef = useRef();
    // user auxiliar
    const [user, setUser] = useState({
      firstName: '',
      lastName: '',
      birthDate: '',
      email: '',
      password: '',
    });

    // instancia de la clase UserService
    const userService = new UserService();
    const localStorageService = new LocalStorageService();

    const getUser = async () => {
      const resultUser = await userService.getUser(id);
      setUser(resultUser.data);
    }

    useEffect(()=>{
      if ( typeForm === 'update') {
        getUser();
      }
    }, [])

    useEffect(() => {
      if (user.birthDate) {
        setDate(convertFireBaseDate(user.birthDate));
      }
    }, [user.birthDate]);
  
    // funcion para manejar el submit del formulario
    const submit = async (event) => {
      event.preventDefault();
      
      // creacion del objeto usario
      const newUser = {
          firstName: firstNameRef.current?.value,
          lastName: lastNameRef.current?.value,
          birthDate: date,
          email: emailRef.current?.value,
          password: password,
          rol: 'user',
      }
      
      if (typeForm === 'create') {
        // Guardar informacion en firebase y localStorage
        const result = await userService.createUser(newUser);
        if (result.data != null) {
          localStorageService.addLoggedUser(result.data)
          navigation('/');
          alert(result.message);
        }else {
          alert(result.message);
        }
      }

      if (typeForm === "update") {
        // Actualizar informacion
        const result = await userService.updateUser(newUser,id);
        localStorageService.updateLoggedUser(result.data);
        alert(result.message);
        navigation('/');
      }

    }

    // Convertir la fecha que obtiene de firebase a tipo date para visualizar
    const convertFireBaseDate = (timeStamp) => {
      if (!timeStamp || !timeStamp.seconds) return null;
      return new Date(timeStamp.seconds * 1000);  // Convertir segundos a milisegundos
    }

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

  return (
    <>
      <form className={`mt-5 w-11/12 grid grid-cols-1 justify-items-center items-center gap-7 ${typeForm === 'update' ? 'md:grid-cols-2' : ''}`} onSubmit={(event)=> submit(event)}>
        {/* input first name */}
        <FloatLabel className="flex flex-col justify-center items-center">
          <InputText className="w-[276px]" id="first-name" ref={firstNameRef} keyfilter="alpha" type={'text'} defaultValue={user.firstName} required/>
          <label htmlFor="first-name" className="font-bold mb-2">First Name</label>
          <small id="first_name-help" className="mt-2 font-Opensans text-text_danger text-xs hidden">
            Enter your username to reset your password.
          </small>
        </FloatLabel>
        {/* input last name */}
        <FloatLabel className="flex flex-col justify-center items-center">
          <InputText className="w-[276px]" id="last-name" ref={lastNameRef} keyfilter="alpha" type={'text'} defaultValue={user.lastName} required/>
          <label htmlFor="last-name" className="font-bold mb-2">Last Name</label>
          <small id="last_name-help" className="mt-2 font-Opensans text-text_danger text-xs hidden">
            Enter your username to reset your password.
          </small>
        </FloatLabel>
        {/* input birth date */}
        <FloatLabel className="flex flex-col justify-center items-center">
          <Calendar className="w-[276px]" inputId="birth_date" value={date} onChange={(e) => setDate(e.value)} dateFormat="yy-mm-dd" required/>
          <label htmlFor="birth_date" className="font-bold mb-2">Birth Date</label>
          <small id="birth_date-help" className="mt-2 font-Opensans text-text_danger text-xs hidden">
            Enter your username to reset your password.
          </small>
        </FloatLabel>
        {/* input email */}
        <FloatLabel className="flex flex-col justify-center items-center">
          <InputText className="w-[276px]" id="email" ref={emailRef} type={'email'} defaultValue={user.email} required/>
          <label htmlFor="email" className="font-bold mb-2">Email</label>
          <small id="email-help" className="mt-2 font-Opensans text-text_danger text-xs hidden">
            Enter your username to reset your password.
          </small>
        </FloatLabel>
        {/* input password */}
          <FloatLabel className="flex flex-col justify-center items-center">
              <Password inputId="password" value={password} onChange={(e) => setPassword(e.target.value)} footer={footer} type={'password'} required={typeForm === 'create'} toggleMask/>
              <label htmlFor="password" className="font-bold mb-2">Password</label>
            <small id="password-help" className="mt-2 font-Opensans text-text_danger text-xs hidden">
              Enter your username to reset your password.
            </small>
          </FloatLabel>
          {/* input confirm password */}
          <FloatLabel className="flex flex-col justify-center items-center">
              <Password inputId="confirm-password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} footer={footer} type={'password'} required={typeForm === 'create'} toggleMask/>
              <label htmlFor="confirm-password" className="font-bold mb-2">Confirm Password</label>
            <small id="confirm_password-help" className="mt-2 font-Opensans text-text_danger text-xs hidden">
              Enter your username to reset your password.
            </small>
          </FloatLabel>
        <Button className={`${ typeForm === 'update' ? `md:col-span-2` : ''}`} type={'submit'} label={ typeForm==="create" ? "Create" : "Update" } />
      </form>
    </>
  );
};
