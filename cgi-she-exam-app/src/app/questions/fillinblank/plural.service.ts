import { Injectable } from '@angular/core';
var _ = require('lodash');

@Injectable()
export class PluralService {
    
    constructor() {}

    pluralize(terms: string[]): string[] {
        let pluralTerms: string[] = new Array();
        const vowels = ['a','e','i','o','u'];
        
        for (let i = 0; i < terms.length; i++) {
            let term = terms[i];
            if (term.endsWith('s') ||
                term.endsWith('x') ||
                term.endsWith('ch') ||
                term.endsWith('sh')) {
                    pluralTerms.push(`${term}es`);
                    continue;
                }

            if (term.endsWith('z')) {
                pluralTerms.push(`${term}zes`);
                continue;
            }

            const beforeLast = term.charAt(term.length - 2);

            if (term.endsWith('y') && 
                _.indexOf(vowels,beforeLast) != -1) {
                pluralTerms.push(`${term}s`);
                continue;
            }

            if (term.endsWith('y') && 
                _.indexOf(vowels,beforeLast) == -1) {
                pluralTerms.push(`${term.substr(0,term.length - 1)}ies`);
                continue;
            }

            if (term.endsWith('o')) {
                pluralTerms.push(`${term}es`);
                continue;
            }

            if (term.endsWith('is')) {
                pluralTerms.push(`${term.substr(0,term.length - 2)}es`);
                continue;
            }
        }

        return pluralTerms;
    }
}