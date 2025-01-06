import './App.css';
import Login from './pages/Login/Login';
import React, { useEffect, useState } from 'react';

function App() {
  const [showContent, setShowContent] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {

    const timer = setTimeout(() => {
      setShowContent(false); 
      setShowLogin(true); 
    }, 3000); 


    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="App">
        {showContent && (
          <div className="centered fade-in">
            <div className="title">
              FLATVISION
            </div>
            <div className="subtitle">
              LUGAR DE COMODIDAD Y LUJO
            </div>
          </div>
        )}
      </div>
      {showLogin && <Login />} {}
    </>
  );
}

export default App;
