export class LocalStorageService { 

    constructor() {
        
    }

    addLoggedUser(user){
        localStorage.setItem('userLogged', JSON.stringify(user));
    }
}