import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {Term} from './../../model/question/Term';
import {MultipleChoiceQuestion} from './../../model/question/MultipleChoiceQuestion';
import {AppModeStudy} from './../../model/Constants';
import {SessionService} from './../../services/session.service';
import {MultipleChoiceEnglishQuestionType} from './../../model/Constants';
 
@Component({ 
    selector: 'multipleChoice', 
    templateUrl: './multiplechoice.html'
})
export class MultipleChoice {
    @Input() terms : Term[];
    @Input() mcTerms: MultipleChoiceQuestion[];
    @Input() questionType: string;
    @Input() mode: string;
    @Input() instructions: string;
    @Output() answerChosen = new EventEmitter();
    @Output() playAudio = new EventEmitter();

    public ready: boolean = false;
    public complete: boolean = false;
    public success: boolean = false;
    public currentQuestion: MultipleChoiceQuestion;

    public enableFeedback: boolean = false;
    public feedbackSubmitted: boolean = false;

    private _count: number = 0;
    
    constructor(private _sessionService: SessionService) {
        
    }  

      ngOnChanges(changes: SimpleChanges): void {
        if(changes['mcTerms']) {
          if (this.mcTerms === undefined)
            return;

            if (this.mcTerms.length > 0) {
              this.terms= this.mcTerms[0].choices;
              this.ready = true;
              this.currentQuestion = this.mcTerms[0];

              this.enableFeedback = false;
              this.feedbackSubmitted = false;
            }
        }
    }  
    
    answer(term: Term) {

        if (this.mode !== AppModeStudy) {
            this.answerChosen.emit({
                id: term.id
            });
        } else if (this.mode === AppModeStudy) {
            if (term.id === this.currentQuestion.correctId) {
                this.success = true;
            }
            
            this._sessionService.setStudyCorrect(this.success,true);
            this.complete = true;
        }
    }

    answerText(term: Term) {
        if (this.mode !== AppModeStudy) {
            this.answerChosen.emit({
                id: term.id
            });
        }

        let radioButton = document.getElementById(term.id) as HTMLInputElement;
        radioButton.checked = true;
    }

    audio(term: Term) {
        this.playAudio.emit({
            text: term.text
        });
    }

    showAudio(term: Term):boolean {
        if (this.questionType === MultipleChoiceEnglishQuestionType)
            return false;
        
        if (term.text.toLowerCase() === 'none of the above')
            return false;

        return true;
    }

    next() {
        this._count++;
        this.currentQuestion = this.mcTerms[this._count];
        this.terms = this.currentQuestion.choices;

        this.complete = false;
        this.success = false;
        this.enableFeedback = false;
        this.feedbackSubmitted = false;
    }

    displayNext() {
        return this._count < this.mcTerms.length - 1;
      }

    showAnswer(id: string) {
        return this.complete && !this.success && id === this.currentQuestion.correctId;
    }

    showQuestionAudio():boolean {
        return this.questionType === MultipleChoiceEnglishQuestionType;
    }

    playQuestionAudio() {
        this.playAudio.emit({
            text: this.currentQuestion.textTerm
        });
    }
}