import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FlatInfo } from "./FlatInfo/FlatInfo";

export const ViewFlat = () => {

  // obtener el id del piso
  let { flatId } = useParams();
  const navigation = useNavigate();

  // Si no se envia ningun flatid retornar a home
  const checkFlatId = () => {
    if (!flatId) {
      navigation('/')
    }
  }

  useEffect(()=>{
    checkFlatId();
  },[])

    return(
        <>
            <FlatInfo flatId={ flatId }/>
        </>
    );
}