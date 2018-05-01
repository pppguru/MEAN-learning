import {Term} from './Term';
import {Question} from './Question';
import {Section} from './../exam/Section';
import {QuestionInterface} from './../interface/Question.interface';

export class MultipleChoiceQuestion implements QuestionInterface {
    public choices: Term[];
    public correctId: string;
    public question: Question;
    public section: Section;
    public type: string;
    public id: string;
    public text: string;
    public textTerm: string;
    
    constructor() {}

    mapPractice(practice: any): MultipleChoiceQuestion {
        let instance = this;
        instance.type = practice.type;
        instance.correctId = practice.correctResponses[0].id;
        instance.text = practice.text;
        instance.choices = new Array();
        for (let i = 0; i < practice.terms.length; i++) {
            instance.choices.push(new Term(practice.terms[i].text,practice.terms[i].id));
        }

        let questionText = instance.text;
        questionText = questionText.replace('"','<strong><u>').replace('"','</u></strong>');

        let termStart = questionText.search('<u>');
        let termEnd = questionText.search('</u>');
        instance.textTerm = questionText.substring(termStart, termEnd).replace('<u>','');

        return instance;
    }
                
}