import {Day} from './../model/Day';
import { Injectable } from '@angular/core';

@Injectable()
export class DayService {
    
    constructor() {}
    
    days() {
        var list: Day[] = [];
        
        for (var i = 1; i <= 31; i++) {
            list.push({
                name: (i < 10 ? '0' + i.toString() : i.toString()),
                index: i
            });
        }
        
        return list;
    }
}