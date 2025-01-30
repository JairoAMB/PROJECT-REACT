import React, { useState, useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import logo from '../../assets/Img/logo.svg';
import { LocalStorageService } from '../../services/localStorage/localStorage';
import { UserService } from '../../services/user/user';
import Swal from 'sweetalert2';
import "./Header.css"

export const Header = () => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    
    const localStorageService = new LocalStorageService();
    const userService = new UserService();

    useEffect(() => {
        const loggedUser = localStorageService.getLoggedUser();
        if (loggedUser) {
            setUser(loggedUser);
            checkIfAdmin(loggedUser.id);
        }
    }, []);

    const checkIfAdmin = async (userId) => {
        const result = await userService.checkAdminUser(userId);
        setIsAdmin(result);
    };

    const handleLogout = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'You will be logged out.',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Logout',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('userLogged');
                window.location.href = '/login';
            }
        });
    };

    const handleDeleteAccount = async () => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'This action cannot be undone.',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Delete Account',
            confirmButtonColor: '#d33',
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (user?.id) {
                    const response = await userService.deleteUser(user.id);
                    if (response.success) {
                        localStorage.removeItem('userLogged');
                        Swal.fire('Deleted!', 'Your account has been deleted.', 'success').then(() => {
                            window.location.href = '/login';
                        });
                    } else {
                        Swal.fire('Error', 'Error deleting account', 'error');
                    }
                }
            }
        });
    };

    const items = [
        { label: 'Home', icon: 'pi pi-home', command: () => window.location.href = '/' },
        { label: 'Profile', icon: 'pi pi-user', command: () => window.location.href = '/profile' },
        { label: 'My Flats', icon: 'pi pi-building', command: () => window.location.href = '/myflats' },
        { label: 'Favourites', icon: 'pi pi-heart', command: () => window.location.href = '/favorites' },
        ...(isAdmin ? [
            { label: 'All Users', icon: 'pi pi-users', command: () => window.location.href = '/allusers' }
        ] : [])
    ];

    const end = (
        <div className="header-actions">
            {user && <span className="user-info">Hello, {user.firstName} {user.lastName}</span>}
            <Button label="Delete Account" icon="pi pi-trash" className="p-button-danger p-button-outlined" onClick={handleDeleteAccount} />
            <Button label="Logout" icon="pi pi-sign-out" className="p-button-outlined" onClick={handleLogout} />
        </div>
    );

    return (
        <div className="header-container">
            <Menubar 
                model={items} 
                end={end} 
                start={<img src={logo} alt="Logo" className="logo" />}
                className="menubar"
            />
        </div>
    );
};
