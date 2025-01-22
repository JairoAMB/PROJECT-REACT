import './App.css';
import {Route, Routes} from "react-router-dom";
import {Login} from './pages/Login/Login';
import { NewFlat } from './pages/Flat/NewFlat/NewFlat';
import {Register} from './pages/Register/Register'
import { EditFlat } from './pages/Flat/EditFlat/EditFlat';

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/new-flat" element={<NewFlat/>} />
        <Route path="/edit-flat" element={<EditFlat />} />

      </Routes>
    </>
  );
}

export default App;