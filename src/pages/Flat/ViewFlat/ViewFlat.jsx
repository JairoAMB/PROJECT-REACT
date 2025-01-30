import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { FlatInfo } from "./FlatInfo/FlatInfo";
import { FlatCarrusel } from './flatCarrusel/FlatCarrusel';
import { Reviews } from './Reviews/Reviews';
import { LocalStorageService } from '../../../services/localStorage/localStorage';
// libreria de componentes

export const ViewFlat = () => {

  // obtener el id del piso
  let { flatId } = useParams();
  const navigation = useNavigate();

  const localStorageService = new LocalStorageService();

  // Si no se envia ningun flatid retornar a home
  const checkFlatId = () => {
    if (!flatId) {
      navigation('/')
    }
  }

  useEffect(()=>{
    if (!localStorageService.checkLoggedUser()){
        navigation('/login');
    }
    checkFlatId();
  },[])


    return(
        <>  
        <div className="bg-bg_color_primary relative w-full h-full max-w-[1440px] m-auto flex flex-col items-center gap-2"> 
          <div className='w-11/12 flex flex-col justify-center items-stretch md:flex-row md:justify-around'>
            <section className='flex-1 flex justify-center items-center'>
              <FlatCarrusel />
            </section>
            <section className='flex-1 max-w-[600px] mt-2 bg-gradient-to-br backdrop-blur-3xl sm:px-4'>
              <FlatInfo flatId={ flatId }/>
            </section>
          </div>
          <div className='mt-4 w-11/12'>
            <h3 className='font-Montserrat font-bold text-primary_text text-xl mb-4'>Reviews</h3>
            <Reviews/>
          </div>
        </div>
        </>
    );
}






