import { Injectable } from '@angular/core';

@Injectable()
export class StateService {
   constructor() {}
   
   states() {
       var list = [];
        list.push('AK');
        list.push('AL');
        list.push('AR');
        list.push('AZ');
        list.push('CA');
        list.push('CO');
        list.push('CT');
        list.push('DC');
        list.push('DE');
        list.push('FL');
        list.push('GA');
        list.push('HI');
        list.push('IA');
        list.push('ID');
        list.push('IL');
        list.push('IN');
        list.push('KS');
        list.push('KY');
        list.push('LA');
        list.push('MA');
        list.push('MD');
        list.push('ME');
        list.push('MI');
        list.push('MN');
        list.push('MO');
        list.push('MS');
        list.push('MT');
        list.push('NC');
        list.push('ND');
        list.push('NE');
        list.push('NH');
        list.push('NJ');
        list.push('NM');
        list.push('NV');
        list.push('NY');
        list.push('OH');
        list.push('OK');
        list.push('OR');
        list.push('PA');
        list.push('RI');
        list.push('SC');
        list.push('SD');
        list.push('TN');
        list.push('TX');
        list.push('UT');
        list.push('VA');
        list.push('VT');
        list.push('WA');
        list.push('WI');
        list.push('WV');
        list.push('WY');
       
       return list;
   }
}