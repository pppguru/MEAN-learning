import { TermInterface } from './../interface/Term.interface';

export class Term implements TermInterface {
    public language: string;
    public selected: boolean = false;
    public checked: boolean = false;
    public matchedchoice: Term;
    public text: string;
    public id: string;
    public matched: boolean = false;
    public success: boolean;
    public translations: Term[] = new Array();

    constructor(text: string, id: string)
     {
         this.text = text;
         this.id = id;
         this.matched = false;
     }
                
}