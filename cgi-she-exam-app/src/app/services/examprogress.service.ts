import { GroupingResponse } from './../model/question/response/GroupingResponse';
import { MatchingResponse } from './../model/question/response/MatchingResponse';
import { MultipleChoiceResponse } from './../model/question/response/MultipleChoiceResponse';
import { QuestionResponse } from './../model/question/response/QuestionResponse';
import { ExamSubmission } from './../model/exam/ExamSubmission';

import {Exam} from './../model/exam/Exam';
import {ExamCompleteComponent} from './../exam/examcomplete.component';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {QuestionInterface} from './../model/interface/Question.interface';
import {MultipleChoiceEnglishQuestionType, MultipleChoiceSpanishQuestionType, 
     MatchingQuestionType,
     GroupingQuestionType} from './../model/Constants';

import {ExamService} from './../exam/exam.service';
import {EventService} from './event.service';
import {SessionService} from './session.service';

@Injectable()
export class ExamProgressService {
    answers: QuestionResponse[];
    exam: Exam;
    questionsComplete: number = 0;
    examSubmission: ExamSubmission;

    constructor(private _router: Router,
                private _examService: ExamService,
                private _eventService: EventService,
                private _sessionService: SessionService) {
        this.answers = new Array();
    }

    continue() {
        this.answers = this.getProgress();
    }

    examComplete() {
        this._sessionService.setExamProgress(null);
    }

    setCurrentExam(exam: Exam) {
        this.exam = exam;
        this._sessionService.setExam(exam);

        this.examSubmission = new ExamSubmission();
        this.examSubmission.examId = this.exam.id;
    }

    nextQuestion() :QuestionInterface {
        return this.exam.questions[this.questionsComplete];
    }

    isLastQuestion() {
        return this.exam.questions.length - 1 === this.questionsComplete;
    }

    progress():string {
        return 'Question ' + (this.questionsComplete + 1).toString() + ' / ' + this.exam.questions.length.toString();
    }

    saveProgress(sectionId: string, questionId: string, questionType: string, answer: any):boolean {
        let newAnswer = new QuestionResponse();
        newAnswer.questionId = questionId;
        newAnswer.sectionId = sectionId;

        switch (questionType)
        {
            case MultipleChoiceEnglishQuestionType:
            case MultipleChoiceSpanishQuestionType:
                newAnswer.responses = new Array();
                newAnswer.responses.push(new MultipleChoiceResponse(answer.id));
            break;
            case MatchingQuestionType:
                newAnswer.responses = new Array();
                for (let i = 0; i < answer.length; i++) {
                    newAnswer.responses.push(new MatchingResponse(answer[i].id,
                        answer[i].matchedid));
                }
            break;
            case GroupingQuestionType:
                newAnswer.responses = new Array();
                for (let i = 0; i < answer.length; i++) {
                    newAnswer.responses.push(new GroupingResponse(answer[i].groupedid,
                        answer[i].id));
                }
            break;
        }

        this.answers.push(newAnswer);
        this._sessionService.setExamProgress(this.answers);
        this.questionsComplete = this.answers.length;

        if (this.exam.questions.length === this.questionsComplete) {
            this.examSubmission.responses = this.answers;
            this._examService.submitExam(this.examSubmission)
                .subscribe(
                response => { 
                    this._sessionService.setExamResponse(response);
                    this._router.navigate(['examcomplete']); 
                },
                error => this._handleSubmissionError(error)
            );
            return false;
        }

        return true;
    }

    _handleSubmissionError(error) {
        console.error(error);
        this._eventService.broadcast('There was an error when submitting your exam for grading');
    }

    getProgress() {
        if (this._sessionService.getExamProgress() != null)
            return this._sessionService.getExamProgress();
        else
            return null;
    }
    
}