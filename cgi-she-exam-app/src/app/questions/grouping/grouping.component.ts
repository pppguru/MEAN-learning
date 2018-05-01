import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {Term} from './../../model/question/Term';
import {GroupingQuestion} from './../../model/question/GroupingQuestion';
import {Category} from './../../model/question/Category';
import {GroupingTermsShown} from './../../model/Constants';
import {AppModeStudy} from './../../model/Constants';
import {SessionService} from './../../services/session.service';
var _ = require('lodash');

@Component({ 
    selector: 'grouping', 
    templateUrl: './grouping.html',
})
export class Grouping {
    @Input() terms : Term[];
    @Input() categories: Category[];
    @Input() gTerms: GroupingQuestion[];
    @Input() mode: string;
    @Input() instructions: string;

    @Output() choiceGrouped = new EventEmitter();
    @Output() termUndo = new EventEmitter();

    public ready: boolean = false;
    public complete: boolean = false;
    public success: boolean = false;
    public currentQuestion: GroupingQuestion;

    public enableFeedback: boolean = false;
    public feedbackSubmitted: boolean = false;

    private _count: number = 0;

    termsshown : number;
    grouped: number = 0;
    
    constructor(private _sessionService: SessionService) {
        this.termsshown = GroupingTermsShown;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes['gTerms']) {
          if (this.gTerms === undefined)
            return;

            if (this.gTerms.length > 0) {
              this.terms= this.gTerms[0].choices;
              this.categories = this.gTerms[0].categories;
              this.ready = true;
              this.currentQuestion = this.gTerms[0];

              this.enableFeedback = false;
              this.feedbackSubmitted = false;
            }
        }
    } 

    dragstart(ev, id) {
        ev.dataTransfer.setData('choice', id);
    }

    dropped(ev, id) {
        ev.preventDefault();
        let droppedid = ev.dataTransfer.getData('choice');
        this._grouped(id, droppedid);
    }

    dragover(ev) {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = 'move';
    }

    undo(category: Category, term: Term) {
        this.termUndo.emit({
            id: category.id,
            termid: term.id
        });
        
        let index = category.groupedterms.indexOf(term,0);
        category.groupedterms.splice(index,1);
        term.matched = false;
        this.grouped--;

        if (this.mode === AppModeStudy) {
            this._sessionService.resetStudyScore(term.success);
        }
    }

    categoryCheckChanged(category: Category) {
        if (category.checked) {
            //uncheck any other categories
            for (let i = 0; i < this.categories.length; i++) {
                if (category.id !== this.categories[i].id &&
                    this.categories[i].checked) {
                        this.categories[i].checked = false;
                    }
            }       

            //check if a term is checked
            for (let i = 0; i < this.terms.length; i++) {
                if (this.terms[i].checked) {
                    let catObject = document.getElementById(category.id);
                    (<HTMLInputElement>catObject).checked = false;
                    category.checked = false;
                    this.terms[i].checked = false;
                    this._grouped(category.id, this.terms[i].id);
                    break;
                }
            }
        }
    }

    termCheckChanged(term: Term) {
        if (term.checked) {
            //uncheck any other terms
            for (let i = 0; i < this.terms.length; i++) {
                if (term.id !== this.terms[i].id &&
                    this.terms[i].checked) {
                        this.terms[i].checked = false;
                    }
            }
        
            //check if a category is checked
            for (let i = 0; i < this.categories.length; i++) {
                if (this.categories[i].checked) {
                    let catObject = document.getElementById(this.categories[i].id);
                    (<HTMLInputElement>catObject).checked = false;
                    this.categories[i].checked = false;
                    term.checked = false;
                    this._grouped(this.categories[i].id, term.id);
                    break;
                }
            }
        }
    }

    _grouped(id: string, droppedid: string) {

        if (droppedid === undefined)
            return;

        this.choiceGrouped.emit({
            id: droppedid,
            groupedid: id
        });

        let choice = <Term>this._getChoice(droppedid);

        if (choice === undefined)
            return;    

        if (!choice.hasOwnProperty('matched')) {
            choice['matched'] = false;
        }

        choice.matched = true;

        let category = <Category>this._getCategory(id);
        
        if (category.groupedterms == null)
            category.groupedterms = new Array();

        category.groupedterms.push(choice);
        this.grouped++;

        if (this.mode === AppModeStudy) {
            for (let i = 0; i < this.currentQuestion.correctResponses.length; i++) {
                if (this.currentQuestion.correctResponses[i].categoryId === id &&
                    this.currentQuestion.correctResponses[i].termId === droppedid) {
                        choice.success = true;
                        break;
                    }
            }
    
            if (choice.success === undefined)
                choice.success = false;

            this._sessionService.setStudyCorrect(choice.success,true);

            if (this.grouped === this.terms.length)
                this.complete = true;
        }
    }

    _getChoice(id) {
        return _.find(this.terms, {id: id});
    }

    _getCategory(id) {
        return _.find(this.categories, {id: id});
    }

    next() {
        this._count++;
        this.currentQuestion = this.gTerms[this._count];
        this.terms = this.currentQuestion.choices;
        this.categories = this.currentQuestion.categories;

        this.complete = false;
        this.success = false;
        this.enableFeedback = false;
        this.feedbackSubmitted = false;     
    }  
    
}