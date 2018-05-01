import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
    constructor() { }

    billStartDate(): string {
        //Create datestring for payflow start in mmddyyyy format
        let date = new Date();
        date.setTime(date.getTime() + (24 * 60 * 60 * 1000)); //set to tomorrow
        let monthString: string;
        let dayString: string;
        let month = date.getMonth() + 1;
        if (month < 10) {
            monthString = '0' + month;
        }
        else if (month > 12) {
            monthString = '01';
        }

        if (monthString === undefined)
            monthString = month.toString();

        let day = date.getDate();

        if (day < 10)
            dayString = '0' + day;

        if (dayString === undefined)
            dayString = day.toString();

        let year = date.getFullYear();
        let datestring: string = `${monthString}${dayString}${year.toString()}`;
        return datestring;
    }
}