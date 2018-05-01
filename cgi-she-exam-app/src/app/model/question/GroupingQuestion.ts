import {Question} from './Question';
import {Section} from './../exam/Section';
import {Term} from './Term';
import {Category} from './Category';
import {CategoryTerm} from './CategoryTerm';
import {QuestionInterface} from './../interface/Question.interface';
var _ = require('lodash');

export class GroupingQuestion implements QuestionInterface{
    public question: Question;
    public section: Section;
    public choices: Term[];
    public categories: Category[];
    public correctResponses: any[];
    public type: string;
    public id: string;
    public text: string;
                
    constructor() {}
    
    mapPractice(practice: any): GroupingQuestion {
        let instance = this;
        instance.correctResponses = practice.correctResponses;

        instance.categories = new Array();
        let sc = _.shuffle(practice.categories);
        sc = _.uniqBy(sc, "id"); //unique list of categories
        
        for (let g = 0; g < sc.length; g++) {
            instance.categories.push(new Category(sc[g].text,
                sc[g].id));
        }

        instance.choices = new Array();
        let gt = _.shuffle(practice.terms);

        for (let t = 0; t < gt.length; t++) {
            instance.choices.push(new Term(gt[t].text, gt[t].id));
        }

        return instance;
    }
}