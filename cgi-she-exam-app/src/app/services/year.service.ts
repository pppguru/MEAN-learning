import { YoungestAgeFromCurrent } from './../model/Constants';
import { YearsAvailable } from './../model/Constants';
import { Injectable } from '@angular/core';

@Injectable()
export class YearService {
    constructor() {}
    
    years(): string[] {
        let list: string[] = new Array();
        let currentDate: Date = new Date();
        let currentYear = currentDate.getFullYear() - YoungestAgeFromCurrent;
        
        for (let i = 1; i < YearsAvailable; i++) {
            list.push((currentYear - i).toString());
        }
        
        return list;
    }

    CCYears(): string[] {
        let list: string[] = new Array();
        let currentDate: Date = new Date();
        let currentYear: number = currentDate.getFullYear();
        list.push(currentYear.toString());

        for (let i = 1; i < 10; i++) {
            list.push((currentYear + i).toString());
        }

        return list;
    }
}