import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// Libreria de componentes
import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';
import { InputSwitch } from 'primereact/inputswitch';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
// importar los servicios de flat para crear flat en firebase
import { FlatService } from '../../../../services/flat/flat.js'
import { LocalStorageService } from "../../../../services/localStorage/localStorage.js";
import { UserService } from "../../../../services/user/user.js";

export const FlatForm = ({flatId}) => {

  // determinar si el formulario crea o visualiza usario
  let typeForm = 'create';
  if (flatId) {
    typeForm = 'update';
  }

  const navigation = useNavigate();
  //Referencias a los inputs
  const cityRef = useRef();
  const streetNameRef = useRef(); 
  const [streetNumber, setStreetNumber] = useState(null);
  const [area, setArea] = useState(null);
  const [acChecked, setAcChecked] = useState(true);
  const [yearBuilt, setYearBuilt] = useState(null);
  const [rentPrice, setRenrPrice] = useState(null);
  const [date, setDate] = useState(null);

  // flat auxiliar
  const [flat, setflat] = useState({
    city: '',
    streetName: '',
    streetNumber: '',
    area: '',
    ac: '',
    yearBuilt: '',
    rentPrice: '',
    dateAvailable: '',
    createdBy: '',

  });

  // instancia de la clase flatService
  const flatService = new FlatService();
  const userService = new UserService();
  const localStorageService = new LocalStorageService();
  const userlogged = localStorageService.getLoggedUser();

  const checkFlatOwner = async ()=> {
    const response = await flatService.getFlatbyId(flatId);
    if ( response.data.createdBy !== userlogged.id) {
      navigation('/');
    }else {
      setflat(response.data)
    }
  }

  useEffect(()=>{
    if ( typeForm === 'update') {
      checkFlatOwner();
    }
  }, [])

  useEffect(() => {
    if (typeForm === 'update' && flat) {
      setStreetNumber(flat.streetNumber || null);
      setArea(flat.area || null);
      setAcChecked(flat.ac ?? true);  // Manejo de valores booleanos con nullish coalescing
      setYearBuilt(convertFireBaseDate(flat.yearBuilt));
      setRenrPrice(flat.rentPrice || null);
      setDate(convertFireBaseDate(flat.dateAvailable));
    }
  }, [flat]);

  // Convertir la fecha que obtiene de firebase a tipo date para visualizar
  const convertFireBaseDate = (timeStamp) => {
    if (!timeStamp || !timeStamp.seconds) return null;
    return new Date(timeStamp.seconds * 1000);  // Convertir segundos a milisegundos
  }

  // funcion submit formulario
  const submit = async (event)=> {
    event.preventDefault();
    
    const newFlat = {
      city: cityRef.current?.value,
      streetName: streetNameRef.current?.value,
      streetNumber: streetNumber,
      area: area,
      ac: acChecked,
      yearBuilt: yearBuilt,
      rentPrice: rentPrice,
      dateAvailable: date,
      createdBy: userlogged.id
    }
    console.log('flat',newFlat)

    if (typeForm === 'create') {
      const result = await flatService.createFlat(newFlat);
      await userService.addFlatUser(userlogged.id);
      if (result.data !== null) {
        alert(result.message);
        navigation('/');
      }else {
        alert(result.message);
      }
    }

    if ( typeForm === 'update' ) {
      const result = await flatService.updateFlat(newFlat, flatId)

      if(result.data !== null) {
        console.log('update', result.data);
        alert(result.message);
        navigation('/');
      }else {
        alert(result.message);
      }
    }
    
  }

  return (
    <>
      <form className="w-full grid grid-cols-1 justify-items-center items-center gap-4 sm:grid-cols-2" onSubmit={(event)=> submit(event)}>
        {/* input city */}
        <div className="flex flex-col">
            <label htmlFor="city" className="font-Opensans text-sm text-primary_text mb-1 ml-5">City</label>
            <div className="flex items-center gap-1">
                <i className="pi pi-map"></i>
                <InputText id="city" ref={cityRef} placeholder="Quito" keyfilter="alpha" defaultValue={flat.city} required/>
            </div>
            <small id="city-help" className="font-Opensans text-text_danger text-xs hidden">
                Enter your username to reset your password.
            </small>
        </div>
        {/* input street name */}
        <div className="flex flex-col">
          <label htmlFor="street-name" className="font-Opensans text-sm text-primary_text mb-1 ml-5">Street Name</label>
          <div className="flex items-center gap-1">
            <i className="pi pi-angle-double-up"> </i>
            <InputText id="street-name" ref={streetNameRef} placeholder="Av 6 de Diciembre" keyfilter="alpha" defaultValue={flat.streetName} required/>               
          </div>
          <small id="street-help" className="font-Opensans text-text_danger text-xs hidden">
            Enter your username to reset your password.
          </small>
        </div>
        {/* input street number */}
        <div className="flex flex-col">
          <label htmlFor="street-number" className="font-Opensans text-sm text-primary_text mb-1 ml-5">Street Number</label>
          <div className="flex items-center gap-1">
            <i className="pi pi-list"> </i>
            <InputNumber inputId="street-number" value={typeForm == 'update' ? flat.streetNumber : streetNumber} onValueChange={(e) => setStreetNumber(e.value)} placeholder="9" required/>         
          </div>
          <small id="street_number-help" className="font-Opensans text-text_danger text-xs hidden">
            Enter your username to reset your password.
          </small>
        </div>
        {/* input area size */}
        <div className="flex flex-col">
          <label htmlFor="area" className="font-Opensans text-sm text-primary_text mb-1 ml-5">Area Size</label>
          <div className="flex items-center gap-1">
            <i className="pi pi-arrows-alt"> </i>
            <InputNumber inputId="area" value={typeForm == 'update' ? flat.area : area} onValueChange={(e) => setArea(e.value)} placeholder="100 m2" suffix=" m2"/>         
          </div>
          <small id="area-help" className="font-Opensans text-text_danger text-xs hidden">
            Enter your username to reset your password.
          </small>
        </div>
        {/* input ac */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <label htmlFor="ac" className="font-Opensans text-sm text-primary_text mb-1 ">Has AC?</label>
            <InputSwitch checked={acChecked} onChange={(e) => setAcChecked(e.value)} />         
          </div>
          <small id="ac-help" className="font-Opensans text-text_danger text-xs hidden">
            Enter your username to reset your password.
          </small>
        </div>
        {/* input year built */}
        <div className="flex flex-col">
          <label htmlFor="year-built" className="font-Opensans text-sm text-primary_text mb-1 ml-5">Year Built</label>
          <div className="flex items-center gap-1">
            <i className="pi pi-calendar"> </i>
            <Calendar id="year-built" value={yearBuilt} onChange={(e) => setYearBuilt(e.value)} placeholder="1998" view="year" dateFormat="yy" />         
          </div>
          <small id="year-help" className="font-Opensans text-text_danger text-xs hidden">
            Enter your username to reset your password.
          </small>
        </div>
        {/* input rent price */}
        <div className="flex flex-col">
          <label htmlFor="rent-price" className="font-Opensans text-sm text-primary_text mb-1 ml-5">Rent Price</label>
          <div className="flex items-center gap-1">
            <i className="pi pi-dollar"> </i>
            <InputNumber inputId="rent-price" value={typeForm == 'update' ? flat.rentPrice : rentPrice} onValueChange={(e) => setRenrPrice(e.value)} placeholder="$ 500" prefix="$ "/>         
          </div>
          <small id="rent_price-help" className="font-Opensans text-text_danger text-xs hidden">
            Enter your username to reset your password.
          </small>
        </div>
        {/* input date available */}
        <div className="flex flex-col">
          <label htmlFor="date-available" className="font-Opensans text-sm text-primary_text mb-1 ml-5">Date Available</label>
          <div className="flex items-center gap-1">
            <i className="pi pi-clock"> </i>
            <Calendar className="w-[248px]" value={date} onChange={(e) => setDate(e.value)} dateFormat="dd/mm/yy" showIcon/>         
          </div>
          <small id="date_available-help" className="font-Opensans text-text_danger text-xs hidden">
            Enter your username to reset your password.
          </small>
        </div>  
        <Button type={'submit'} label={ typeForm == 'update' ? 'Update' : 'Create' } className="sm:col-span-2"/>
      </form>
    </>
  );
};
