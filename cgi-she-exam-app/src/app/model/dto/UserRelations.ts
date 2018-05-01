import {Address} from './../Address';
import {Telephone} from './../Telephone';
import {Nationality} from './../Nationality';

export class UserRelations {
    public addresses: Address[];
    public telephones: Telephone[];
    public nationality: Nationality;
    public role: any;
    
    constructor() {}
}