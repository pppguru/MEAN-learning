import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {
    constructor() {}

    emailIsValid(address: string): boolean {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(address))  
            return true;
        else
            return false;
    }
}