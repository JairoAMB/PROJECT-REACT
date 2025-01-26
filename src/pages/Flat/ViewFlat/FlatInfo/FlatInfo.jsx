import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Servicios
import { FlatService } from "../../../../services/flat/flat";
import { LocalStorageService } from "../../../../services/localStorage/localStorage";
import { Fan } from "../../../../assets/svg/fan";
// 
import { Divider } from 'primereact/divider';
        

export const FlatInfo = ({flatId}) => {
    
    const [edit, setEdit] = useState(false);
    const [ac, setAc] = useState(false)

    const navigation = useNavigate();

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

    // servicios
    const flatService = new FlatService();
    const localStorageService = new LocalStorageService();

    // Obtener el usuario loggeado
    const userlogged =localStorageService.getLoggedUser();

  const checkFlatOwner = async ()=> {
      const response = await flatService.getFlatbyId(flatId);
      if ( response.data.createdBy !== userlogged.id) {
        // navigation('/');
        setEdit(false);
        setflat(response.data);
      }else {
        setEdit(true);  
        setflat(response.data);
        // console.log(flat);
      }
    }

    useEffect(()=> {
        checkFlatOwner();
    },[])

    // Formatear el año de creacion
    const formatYearBuilt = (date) => {
      if (!date) return 'Fecha no disponible';

      if ( typeof(date) === 'object'  ) {
          const newdate = new Date(date.seconds*1000);
          return new Intl.DateTimeFormat('es-ES', {
              year: 'numeric',
          }).format(newdate);
      }
  };

  const formatDateAvaialble = (date) => {
    if (!date) return 'Fecha no disponible';

    if ( typeof(date) === 'object'  ) {
        const newdate = new Date(date.seconds*1000);
        return new Intl.DateTimeFormat('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }).format(newdate);
    }
};

const handleNavigate = () => {
  navigation(`/edit-flat/${flatId}`);
};

  useEffect(() => {
    if (flat.ac) {
      setAc(true);
    }
  },);

    return(
        <>
          <div className="relative h-full  px-2 flex flex-col">
              {edit && (
                <div className="absolute z-10 top-2 right-3" onClick={handleNavigate}>
                  <span className="sm:hidden"><i className="pi pi-pen-to-square text-lg"></i></span>
                  <span className="hidden sm:inline-block font-Lora text-white border rounded bg-[#114B5F] px-3 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300">Edit</span>
                </div>
              )}
              <div>
                <h3 className="text-primary_text text-lg font-bold font-Montserrat sm:mt-8 md:text-2xl">{ `${flat.city} - Apartment ` }</h3>
                <span className="text-secondary_text text-sm font-Lora"> { `${flat.streetName} - ${flat.streetNumber}` } </span>
              </div>
              <Divider className="my-3"/>
              <span className=" text-text-primary-color/80 text-lg font-Lora font-bold"> { `$ ${flat.rentPrice}` } </span>
              <Divider className="my-3"/>
              <div className="flex flex-row justify-around">
                <div className="flex flex-col justify-center items-center">
                   <span className="text-secondary_text text-sm font-Lora">Year Built</span> 
                   <span className="text-secondary_text text-base font-Lora">{formatYearBuilt(flat.yearBuilt)}</span> 
                </div>
                <div className="flex flex-col justify-center items-center">
                   <span className="text-secondary_text text-sm font-Lora">Area Size</span> 
                   <span className="text-secondary_text text-base font-Lora">{ `${ flat.area } m2`  }</span> 
                </div>
                {ac && (
                  <div className="flex flex-col justify-center items-center">
                    <span className="text-secondary_text text-sm font-Lora">AC</span> 
                    <Fan/> 
                  </div>
                )}
              </div>
              <Divider className="my-3"/>
              <div>
                <span className="text-pretty text-primary_text text-sm font-Opensans">Description:</span>
                <p className="mt-1 text-pretty text-primary_text/60 text-sm font-Opensans">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam dignissimos dolore eaque, ad id nihil explicabo est iusto assumenda magnam eius recusandae voluptas saepe ullam doloremque ab adipisci eos laborum.</p>
              </div>
              <span className="my-8 font-Opensans text-primary_text"> Date Available: { formatDateAvaialble(flat.dateAvailable) } </span>          
          </div>
        </>
    );
}