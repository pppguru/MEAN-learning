import {QuestionInterface} from './../interface/Question.interface';
import {MultipleChoiceQuestion} from './../question/MultipleChoiceQuestion';
import {MatchingQuestion} from './../question/MatchingQuestion';
import {GroupingQuestion} from './../question/GroupingQuestion';
import {Question} from './../question/Question';
import {Term} from './../question/Term';
import {Category} from './../question/Category';
import {Section} from './Section';
import {GeneralAlias, GeneralCategory} from './../Constants';
var _ = require('lodash');

import {MultipleChoiceEnglishQuestionType, 
        MultipleChoiceSpanishQuestionType,
        MatchingQuestionType, GroupingQuestionType} from './../Constants';

export class Exam {
    public id: string;
    public sections: Section[];
    public questions : QuestionInterface[];
    public length: number;
    public categories: any[];

    constructor() {}

    mapExam(exam: any):this {
        //save the exam

        let instance = this;

        this.id = exam.id;
        this.sections = exam.sections;
        this.questions = new Array();
        this.length = exam.length;
        this.categories = exam.categoriesCovered;
        
        //randomize the questions from the server
        //exam.questions = _.shuffle(exam.questions);

        for (var s of exam.sections) {
            for (var q of s.questions) {
                let question = new Question();
                question.id = q.id;
                question.text = q.text;

                let section = new Section();
                section.instructions = s.instructions;
                section.id = s.id;
                section.type = s.type;
    
                switch (q.type) {
                    case MultipleChoiceEnglishQuestionType:
                    case MultipleChoiceSpanishQuestionType:
                        let mcq = new MultipleChoiceQuestion();
                        let questionText = question.text;
                        questionText = questionText.replace('"','<strong><u>').replace('"','</u></strong>');

                        let termStart = questionText.search('<u>');
                        let termEnd = questionText.search('</u>');
                        mcq.textTerm = questionText.substring(termStart, termEnd).replace('<u>','');
                        question.text = questionText;
                        mcq.question = question;
                        mcq.section = section;
                        mcq.type = q.type;
                        mcq.choices = q.terms;
                        this.questions.push(mcq);
                        break;
                    case MatchingQuestionType:
                        let mq = new MatchingQuestion();
                        mq.question = question;
                        mq.section = section;
                        mq.type = q.type;
                        mq.english = q.candidates;
                        mq.spanish = q.terms;
    
                        //randomize english and spanish choices into one array
                        mq.terms = new Array();
                        for (let i = 0; i < mq.english.length; i++) {
                            let mt = new Term(mq.english[i].text, mq.english[i].id);
                            mt.language = 'english';
                            mq.terms.push(mt);
                        }
    
                        for (let i = 0; i < mq.spanish.length; i++) {
                            let mt = new Term(mq.spanish[i].text, mq.spanish[i].id);
                            mt.language = 'spanish';
                            mq.terms.push(mt);
                        }
    
                        //lodash randomize
                        mq.terms = _.shuffle(mq.terms);

                        this.questions.push(mq);
                        break;
                    case GroupingQuestionType:
                        let gq = new GroupingQuestion();
                        gq.question = question;
                        gq.section = section;
                        gq.type = q.type;

                        gq.categories = new Array();
                        let sc = _.shuffle(q.categories);
                        sc = _.uniqBy(sc, "id"); //unique list of categories
                        
                        for (let g = 0; g < sc.length; g++) {
                            gq.categories.push(new Category(sc[g].text,
                                sc[g].id));
                        }

                        gq.choices = new Array();
                        let gt = _.shuffle(q.terms);

                        for (let t = 0; t < gt.length; t++) {
                            gq.choices.push(new Term(gt[t].text, gt[t].id));
                        }

                        this.questions.push(gq);
                        break;
                }
            }
        }

        return instance;
    }
}