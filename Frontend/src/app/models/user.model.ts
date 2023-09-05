export default interface User {
    name: string;
    email: string;
    id: string;
}


export class Usertoken {
    validity?: string;
    idToken?: string;
}