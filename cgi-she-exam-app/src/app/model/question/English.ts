import { TermInterface } from './../interface/Term.interface';

export class English implements TermInterface {
    constructor(public text: string,
                public id: string) {}
                
}