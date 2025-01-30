// React Hooks
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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
  let typeForm = id ? 'update' : 'create';
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const [date, setDate] = useState(null);
  const emailRef = useRef();
  
  const [user, setUser] = useState({ firstName: '', lastName: '', birthDate: '', email: '', password: '' });
  const userService = new UserService();
  const localStorageService = new LocalStorageService();

  useEffect(() => { if (typeForm === 'update') getUser(); }, []);
  useEffect(() => { if (user.birthDate) setDate(convertFireBaseDate(user.birthDate)); }, [user.birthDate]);

  const getUser = async () => {
    const resultUser = await userService.getUser(id);
    if (!resultUser.data) navigate('/');
    setUser(resultUser.data);
  };

  const submit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;
    
    const newUser = {
        firstName: firstNameRef.current?.value,
        lastName: lastNameRef.current?.value,
        birthDate: date,
        email: emailRef.current?.value,
        password: password,
        role: 'user',
        numberOfFlats: 0,
    };
    
    let result;
    if (typeForm === 'create') {
      result = await userService.createUser(newUser);
      if (result.data) localStorageService.addLoggedUser(result.data);
    } else {
      result = await userService.updateUser(newUser, id);
      localStorageService.updateLoggedUser(result.data);
    }
    
    Swal.fire({ icon: result.data ? 'success' : 'error', title: result.message });
    if (result.data) navigate('/');
  };

  const validateForm = () => {
    if (!firstNameRef.current.value.trim()) return showError("First name is required");
    if (!lastNameRef.current.value.trim()) return showError("Last name is required");
    if (!date) return showError("Birth date is required");
    if (!isAdult(date)) return showError("You must be at least 18 years old");
    if (!emailRef.current.value.includes('@')) return showError("Invalid email format");
    if (typeForm === 'create' && password.length < 6) return showError("Password must be at least 6 characters");
    if (typeForm === 'create' && password !== confirmpassword) return showError("Passwords do not match");
    return true;
  };

  const showError = (message) => {
    Swal.fire({ icon: 'error', title: 'Validation Error', text: message });
    return false;
  };

  const convertFireBaseDate = (timeStamp) => {
    return timeStamp?.seconds ? new Date(timeStamp.seconds * 1000) : null;
  };

  const isAdult = (birthDate) => {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Si la fecha de nacimiento aún no ha cumplido este año, restamos 1 a la edad
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      return age >= 18;
    }
    return age >= 18;
  };

  return (
    <form className={`mt-5 w-11/12 grid grid-cols-1 justify-items-center items-center gap-7 ${typeForm === 'update' ? 'md:grid-cols-2' : ''}`} onSubmit={submit}>
      <FloatLabel> <InputText className="w-[276px]" id="first-name" ref={firstNameRef} defaultValue={user.firstName} /> <label>First Name</label> </FloatLabel>
      <FloatLabel> <InputText className="w-[276px]" id="last-name" ref={lastNameRef} defaultValue={user.lastName} /> <label>Last Name</label> </FloatLabel>
      <FloatLabel> <Calendar className="w-[276px]" inputId="birth_date" value={date} onChange={(e) => setDate(e.value)} /> <label>Birth Date</label> </FloatLabel>
      <FloatLabel> <InputText className="w-[276px]" id="email" ref={emailRef} type='email' defaultValue={user.email} /> <label>Email</label> </FloatLabel>
      <FloatLabel> <Password inputId="password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask ={typeForm === 'create'}/> <label>Password</label> </FloatLabel>
      <FloatLabel> <Password inputId="confirm-password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} toggleMask ={typeForm === 'create'}/> <label>Confirm Password</label> </FloatLabel>
      <Button className={`${typeForm === 'update' ? 'md:col-span-2' : ''}`} type='submit' label={typeForm === "create" ? "Create" : "Update"} />
    </form>
  );
};
