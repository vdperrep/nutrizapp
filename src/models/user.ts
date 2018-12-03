export class User {

    firstName: string;
    lastName: string;
    email: string;
    registerDate: Date;

    constructor(firstName: string, lastName: string, email: string, registerDate: Date) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.registerDate = registerDate;
    }

    getFullName() {
        return this.firstName + ' ' + this.lastName;
    }
}