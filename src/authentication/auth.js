class Auth {
    constructor() {
        console.log(localStorage.getItem('lynnAdminEmail'));
        if (!localStorage.getItem('lynnAdminEmail')) {
            this.authenticated = false;
        } else {
            this.authenticated = true;
        }
    }

    login(callback) {
        this.authenticated = true;
        callback();
    }

    logout(callback) {
        this.authenticated = false;
        callback();
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth()