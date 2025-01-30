import React, { useState, useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import logo from '../../assets/Img/logo.svg';
import { LocalStorageService } from '../../services/localStorage/localStorage';
import { UserService } from '../../services/user/user';
import "./Header.css"

export const Header = () => {
    const [user, setUser] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState(false);
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
        localStorage.removeItem('userLogged');
        window.location.href = '/login';
    };

    const handleDeleteAccount = async () => {
        if (user?.id) {
            const result = await userService.deleteUser(user.id);
            if (result.success) {
                localStorage.removeItem('userLogged');
                window.location.href = '/register';
            } else {
                alert('Error deleting account');
            }
        }
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
            <Button label="Delete Account" icon="pi pi-trash" className="p-button-danger p-button-outlined" onClick={() => setDeleteDialog(true)} />
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

            <Dialog 
                visible={deleteDialog} 
                onHide={() => setDeleteDialog(false)}
                header="Confirm Deletion"
                footer={
                    <>
                        <Button label="Cancel" icon="pi pi-times" onClick={() => setDeleteDialog(false)} className="p-button-text" />
                        <Button label="Delete" icon="pi pi-trash" onClick={handleDeleteAccount} className="p-button-danger" />
                    </>
                }
            >
                <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            </Dialog>
        </div>
    );
};
