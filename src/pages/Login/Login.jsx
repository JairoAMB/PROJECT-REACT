
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { NewFlat } from "../Flat/NewFlat/NewFlat";

export const Login = () => {
    const [value, setValue] = useState('');

    return (
        <div className="card flex justify-content-center bg-indigo-700">
            <FloatLabel>
                <InputText id="username" value={value} onChange={(e) => setValue(e.target.value)} />
                <label >Username</label>
            </FloatLabel>
            <NewFlat/>
        </div>

    )
}
        
  
