import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ExamService} from './exam.service';
import {AuthService} from './../services/auth.service';
import {EventService} from './../services/event.service';

import {Exam} from './../model/exam/Exam';
import {Feedback} from './../model/exam/Feedback';
import {ExamStartParam, MatchingQuestionType, 
        MultipleChoiceEnglishQuestionType, 
        MultipleChoiceSpanishQuestionType,
        GroupingQuestionType} from './../model/Constants';
import {ExamProgressService} from './../services/examprogress.service';

import {MultipleChoice} from './../questions/multiplechoice/multiplechoice.component';
import {Matching} from './../questions/matching/matching.component';
import {Grouping} from './../questions/grouping/grouping.component';
import {FeedbackComponent} from './../questions/feedback/feedback.component';
import {Term} from './../model/question/Term';

declare var iSpeechTTS: any;

@Component({
  selector: 'exam',  
  templateUrl: './exam.html',
  providers: [ExamService, ExamProgressService]
})
export class ExamComponent implements OnInit {
    processing: boolean = true;
    exam: Exam;
    currentQuestion: any;
    currentQuestionType: string;
    answer: any;
    questionsComplete: string;
    timePassed: string = '00:00:00';
    examSubmitting: boolean = false;
    enableFeedback: boolean = false;
    feedbackSubmitted: boolean = false;

    private _seconds: number = 0;
    private _minutes: number = 0; 
    private _hours: number = 0;
    private _t: any;
    private _tts: any;

    constructor(private _examService: ExamService,
              private _authService: AuthService,
              private _eventService: EventService,
              private _route: ActivatedRoute,
              private _examProgress: ExamProgressService) 
    {
      this._seconds = 0;
      this._minutes = 0;
      this._hours = 0;
    }
    
    ngOnInit() {
      this.examSubmitting = false;
      
      if (this._examProgress.getProgress() != null) {
        //TODO:  Ask user if they want to continue where they left off
      }

      const typeParam = this._route.snapshot.params["ExamStartParam"];
      this._examService.createExam(this._authService.getUser().id,typeParam)
          .subscribe(
          response => this._handleExamResponse(response),
          error => this._handleError(error)
        );

      let audioPlayer = document.getElementById('audioPlayer');
      this._tts = new iSpeechTTS(audioPlayer, {
            apiKey: 'a4bf1a576382f5e3d671243e5fbbc072',
            voice: 'usspanishfemale'
      });
      

      //touch drag and drop
      document.addEventListener("touchstart", this._touchHandler, true);
      document.addEventListener("touchmove", this._touchHandler, true);
      document.addEventListener("touchend", this._touchHandler, true);
      document.addEventListener("touchcancel", this._touchHandler, true);
    }

     _touchHandler(event) {
      var touch = event.changedTouches[0];
  
      var simulatedEvent = document.createEvent("MouseEvent");
          simulatedEvent.initMouseEvent({
          touchstart: "mousedown",
          touchmove: "mousemove",
          touchend: "mouseup"
      }[event.type], true, true, window, 1,
          touch.screenX, touch.screenY,
          touch.clientX, touch.clientY, false,
          false, false, false, 0, null);
  
      touch.target.dispatchEvent(simulatedEvent);
      event.preventDefault();
    }


    _handleExamResponse(response: any) {
      this.exam = new Exam();
      this.exam.mapExam(response);
      this._examProgress.setCurrentExam(this.exam);
      this._nextQuestion();

      this._questionTimer();
    }

    saveResponse() {
      this.processing = true;
      let next = this._examProgress.saveProgress(
        this.currentQuestion.section.id,
        this.currentQuestion.question.id, 
        this.currentQuestionType,
        this.answer);

      if (next)
        this._nextQuestion();
      else {
        this.examSubmitting = true;
        this.processing = false;
      }

      this.feedbackSubmitted = false;
      this.enableFeedback = false;
    }

   _add(context: any) {
      context._seconds++;
      if (context._seconds >= 60) {
          context._seconds = 0;
          context._minutes++;
          if (context._minutes >= 60) {
              context._minutes = 0;
              context._hours++;
          }
      }
      
      context.timePassed = (context._hours ? (context._hours > 9 ? context._hours : "0" + context._hours) : "00") + ":" + 
          (context._minutes ? (context._minutes > 9 ? context._minutes : "0" + context._minutes) : "00") + ":" + 
          (context._seconds > 9 ? context._seconds : "0" + context._seconds);

      context._questionTimer();
    }

    _questionTimer() {
      let that = this;
      this._t = setTimeout(function() {
        that._add(that);
      }, 1000);
    }

    _nextQuestion() {
      this.currentQuestionType = this._examProgress.nextQuestion().type;
      this.currentQuestion = this._examProgress.nextQuestion();
      this.processing = false;

      switch (this.currentQuestionType)
      {
        case MultipleChoiceEnglishQuestionType:
        case MultipleChoiceSpanishQuestionType:
          this.answer = null;
        case MatchingQuestionType:
        case GroupingQuestionType:
           this.answer = new Array();
        break;
      }

      this.questionsComplete = this._examProgress.progress();
    }

    choiceSelected(event: any) {
      switch (this.currentQuestionType)
      {
        case MultipleChoiceEnglishQuestionType:
        case MultipleChoiceSpanishQuestionType:
          this.answer = event;
          break;
        case MatchingQuestionType:
        case GroupingQuestionType:
           this.answer.push(event);
        break;
      }
    }

    termDeselected(event: any) {
      let index = this.answer.indexOf(event);
      this.answer.splice(index,1);
    }

    nextDisabled() {
      let disabled = true;

      switch (this.currentQuestionType)
      {
        case MultipleChoiceEnglishQuestionType:
        case MultipleChoiceSpanishQuestionType:
          disabled = this.answer == undefined || this.answer.length == 0 ? true : false;
          break;
        case MatchingQuestionType:
          disabled = this.answer.length !== this.currentQuestion.terms.length / 2 ? true : false;
        break;
        case GroupingQuestionType:
          disabled = this.answer.length !== this.currentQuestion.choices.length ? true : false;
        break;
      }

      return disabled;
    }

    submitButtonText() {
      if (!this._examProgress.isLastQuestion())
        return 'Next Question';
      else
        return 'Submit Answers';
    }

    _handleError(error: any) {
      this._eventService.broadcast('error', 'There was an issue creating your exam');
      console.error(error);
    }

    questionAudio(questionChoice: any) {
      this._tts.speak(questionChoice.text);
    }

    eitherMultipleChoice() {
      return this.currentQuestionType === 'Multiple Choice English' || 
        this.currentQuestionType === 'Multiple Choice Spanish';
    }

    showQuestionAudio() {
      return this.currentQuestionType === MultipleChoiceEnglishQuestionType;
    }

    playQuestionAudio() {
      this._tts.speak(this.currentQuestion.textTerm);
    }
}