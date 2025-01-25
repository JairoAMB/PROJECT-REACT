import './App.css';
import {Route, Routes} from "react-router-dom";
import {Login} from './pages/Login/Login';
import {Register} from './pages/Register/Register'
import { ViewProfile } from './pages/Profile/ViewProfile/ViewProfile';
import { UpdateProfile } from './pages/Profile/UpdateProfile/UpdateProfile';
import { NewFlat } from './pages/Flat/NewFlat/NewFlat';
import { EditFlat } from './pages/Flat/EditFlat/EditFlat';
import { ViewFlat } from './pages/Flat/ViewFlat/ViewFlat';
import { Home } from './pages/Home/Home';

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={<ViewProfile />} />
        <Route path="/profile/:id" element={<ViewProfile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/update-profile/:id" element={<UpdateProfile />} />
        <Route path="/new-flat" element={<NewFlat/>} />
        <Route path="/view-flat" element={<ViewFlat/>} />
        <Route path="/view-flat/:flatId" element={<ViewFlat/>} />
        <Route path="/edit-flat" element={<EditFlat />} />
        <Route path="/edit-flat/:flatId" element={<EditFlat />} />

      </Routes>
    </>
  );
}

export default App;