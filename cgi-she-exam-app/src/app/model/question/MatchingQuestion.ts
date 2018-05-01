import {Question} from './Question';
import {English} from './English';
import {Spanish} from './Spanish';
import {Term} from './Term';
import {Section} from './../exam/Section';
import {QuestionInterface} from './../interface/Question.interface';
var _ = require('lodash');

export class MatchingQuestion implements QuestionInterface{
    public question: Question;
    public english: English[];
    public spanish: Spanish[];
    public terms: Term[];
    public type: string;
    public id: string;
    public text: string;
    public section: Section;
    public success: boolean;
    public correctResponses: any[];
    
    constructor() {}

    mapPractice(practice: any):MatchingQuestion {
        let instance = this;
        instance.correctResponses = practice.correctResponses;

        instance.terms = new Array();
        for (let i = 0; i < practice.candidates.length; i++) {
            let t = new Term(practice.candidates[i].text, practice.candidates[i].id);
            t.language = 'english';
            instance.terms.push(t);
        }      

        for (let i = 0; i < practice.terms.length; i++) {
            let t = new Term(practice.terms[i].text, practice.terms[i].id);
            t.language = 'spanish';
            instance.terms.push(t);
        }   

        instance.terms = _.shuffle(instance.terms);  

        return instance;
    }
    
}