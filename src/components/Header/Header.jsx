import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const Header = () => {
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => window.location.href = '/'
        },
        {
            label: 'Profile',
            icon: 'pi pi-user',
            command: () => window.location.href = '/profile'
        },
        {
            label: 'My Flats',
            icon: 'pi pi-building',
            command: () => window.location.href = '/myflats'
        }
    ];

    const end = (
        <Button label="Logout" icon="pi pi-sign-out" className="p-button-outlined" onClick={() => window.location.href = '/login'} />
    );

    return (
        <div>
            <Menubar model={items} end={end} />
        </div>
    );
}

export default Header;
