import {Telephone} from './../Telephone';
import {Address} from './../Address';

export class UserRegistration {
    public telephones: Telephone[];
    public addresses: Address[];
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public passwordConfirmation: string;
    public nationalityId: string;
    public gender: string;
    public dateOfBirth: string;
}