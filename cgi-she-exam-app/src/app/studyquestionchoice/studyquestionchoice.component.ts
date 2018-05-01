import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {MultipleChoice} from './../questions/multiplechoice/multiplechoice.component';
import {Matching} from './../questions/matching/matching.component';
import {Grouping} from './../questions/grouping/grouping.component';
import {FillInBlankComponent} from './../questions/fillinblank/fillinblank.component';
import {FlashcardComponent} from './../questions/flashcard/flashcard.component';
import {Term} from './../model/question/Term';
import {MultipleChoiceQuestion} from './../model/question/MultipleChoiceQuestion';
import {GroupingQuestion} from './../model/question/GroupingQuestion';
import {MatchingQuestion} from './../model/question/MatchingQuestion';
import {Category} from './../model/Category';
import {SelectionComponent} from './../study/category/selection.component';
import {SessionService} from './../services/session.service';
import {TermService} from './../services/term.service';
import {EventService} from './../services/event.service';
import {StudyTerm} from './../model/question/StudyTerm';

declare var iSpeechTTS: any;

@Component({
  selector: 'studyquestionchoice',  
  providers: [TermService],
  templateUrl: './studyquestionchoice.html',
})
export class StudyQuestionChoiceComponent implements OnInit {  
    constructor(private _sessionService: SessionService,
      private _termService: TermService,
      private _eventService: EventService,
      private _router: Router) {} 

    public currentQuestionType: string;
    public fetching: boolean;
    public categoriesChosen: Category[] = new Array();
    public picked: boolean = false;
    public studyType: string;

    private _studyTerms: StudyTerm[];
    public studyTerm: StudyTerm;
    public studyTerms: StudyTerm[];

    public studyMCTerms: MultipleChoiceQuestion[];
    public studyMTerms: MatchingQuestion[];
    public studyGTerms: GroupingQuestion[];
    public groupCatWarning: boolean = false;
    public instructions: string;

    public termsRandom: boolean;

    private _tts: any;

    ngOnInit() {
      if (this._sessionService.getCategories() === undefined && !this._sessionService.getStudyRandom()) {
        this._router.navigate(['study']);
        return;
      }
      this.termsRandom = this._sessionService.getStudyRandom();

      if (!this.termsRandom)
        this.categoriesChosen = this._sessionService.getCategories();

      let audioPlayer = document.getElementById('audioPlayer');
      this._tts = new iSpeechTTS(audioPlayer, {
            apiKey: 'a4bf1a576382f5e3d671243e5fbbc072',
            voice: 'usspanishfemale'
      });
    }

    start(questionType: string) {
      this.groupCatWarning = false;
      this.currentQuestionType = questionType;   

      switch (this.currentQuestionType) {
        case 'FlashCard':
          this.fetching = true;
          this.studyType = 'Flash Cards';
          this._termService.termsByCategory(this.categoriesChosen, 'Spanish',100)
              .subscribe(
              response => this._handleTermResponse(response),
              error => this._handleError(error)
            );
        break;
        case 'Translate':
          this.fetching = true;
          this.studyType = 'Translation';
          this._termService.termsByCategory(this.categoriesChosen, 'Spanish',100)
              .subscribe(
              response => this._handleTermResponse(response),
              error => this._handleError(error)
            );
        break;
        case 'Multiple Choice English':
        case 'Multiple Choice Spanish':
        case 'Grouping':
        case 'Matching':
          if (questionType === 'Grouping') {
            if (this.categoriesChosen.length < 5 && !this._sessionService.getStudyRandom()) {
              this.groupCatWarning = true;
              return;
            }
          }

          this.fetching = true;
          this.studyType = questionType;
          this._termService.questionsByType(this.categoriesChosen, questionType,100)
              .subscribe(
              response => this._handleTermResponse(response),
              error => this._handleError(error)
            );
        break;
      }
    }

    resetStudyType() {
      this.picked = false;
      this.currentQuestionType = null;
    }

    _handleTermResponse(response: any) {
      this.fetching = false;

      switch (this.currentQuestionType) {
        case 'FlashCard':
          this._studyTerms = this._termService.studyTermCollection(response);
          this.studyTerms = this._studyTerms;
          this.picked = true;
          break;
        case 'Translate':
          this._studyTerms = this._termService.studyTermCollection(response);
          this.studyTerms = this._studyTerms;
          this.picked = true;
          break;
        case 'Multiple Choice English':
        case 'Multiple Choice Spanish':
          const section = response.sections[0];
          this.instructions = section.instructions;
          let mcQuestions : MultipleChoiceQuestion[] = new Array();

          for (let i = 0; i < section.questions.length; i++) {
            const question = section.questions[i];
            let mc = new MultipleChoiceQuestion();
            mcQuestions.push(mc.mapPractice(question));
          }

          this.studyMCTerms = mcQuestions;
          this.picked = true;
        break;
        case 'Grouping':
          const gSection = response.sections[0];
          this.instructions = gSection.instructions;
          let gQuestions : GroupingQuestion[] = new Array();

          for (let i = 0; i < gSection.questions.length; i++) {
            const question = gSection.questions[i];
            let g = new GroupingQuestion();
            gQuestions.push(g.mapPractice(question));
          }

          this.studyGTerms = gQuestions;
          this.picked = true;
        break;
        case 'Matching':
          const mSection = response.sections[0];
          this.instructions = mSection.instructions;
          let mQuestions : MatchingQuestion[] = new Array();

          for (let i = 0; i < mSection.questions.length; i++) {
            const question = mSection.questions[i];
            let m = new MatchingQuestion();
            mQuestions.push(m.mapPractice(question));
          }

          this.studyMTerms = mQuestions;
          this.picked = true;
        break;
     }
    }

    _handleError(error: any) {
      this._eventService.broadcast('error', 'There was an issue downloading the terms');
      console.error(error);
    }
    
    playAudio(obj: any) {
      this._tts.speak(obj.text);
    }
}