import { TermInterface } from './../interface/Term.interface';
import { Term } from './Term';

export class Category implements TermInterface {
    public groupedterms: Term[];
    public checked: boolean = false;

    constructor(public text: string,
                public id: string) {}
                
}