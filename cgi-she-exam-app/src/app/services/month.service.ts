import { Month } from './../model/Month';
import { Injectable } from '@angular/core';

@Injectable()
export class MonthService {
    
    constructor() {
  
    }
    
    months(): Month[] {
       let list: Month[] = [];
       list.push({
           name: 'January',
           index: 1 
        });
       list.push({
           name: 'February',
           index: 2 
        });
       list.push({
           name: 'March',
           index: 3 
        });
        list.push({
           name: 'April',
           index: 4 
        });
       list.push({
           name: 'May',
           index: 5 
        });
        list.push({
           name: 'June',
           index: 6 
        });
        list.push({
           name: 'July',
           index: 7 
        });
        list.push({
           name: 'August',
           index: 8 
        });
        list.push({
           name: 'September',
           index: 9 
        });
        list.push({
           name: 'October',
           index: 10 
        });
        list.push({
           name: 'November',
           index: 11 
        });
        list.push({
           name: 'December',
           index: 12
        });
        
        return list;
    }

    CCMonths(): string[] {
        let list: string[] = new Array();
        list.push('01');
        list.push('02');
        list.push('03');
        list.push('04');
        list.push('05');
        list.push('06');
        list.push('07');
        list.push('08');
        list.push('09');
        list.push('10');
        list.push('11');
        list.push('12');

        return list;
    }
}