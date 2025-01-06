import { useState } from 'react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setErrorMessage('Por favor, complete todos los campos.');
        }
    };

    return (
        <div className="login-container">
            <h1>Iniciar sesión</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Correo electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Introduce tu correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Introduce tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p className="error">{errorMessage}</p>}
                <button type="submit" className="login-button">Iniciar sesión</button>
            </form>
            <div className="register-link">
                <p>No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
            </div>
        </div>
    );
};

export default Login;

  
