import {Component, Input} from '@angular/core';

import {ExamService} from './../../exam/exam.service';
import {Feedback} from './../../model/exam/Feedback';
import {StudyTerm} from './../../model/question/StudyTerm';

@Component({
  selector: 'feedback',  
  templateUrl: './feedback.html',
  providers: [ExamService]
})
export class FeedbackComponent {  
    constructor(private _examService: ExamService) {} 

    @Input() enableFeedback: boolean = false;
    @Input() feedbackSubmitted: boolean = false;
    @Input() examid: string;
    @Input() currentQuestion: any;
    @Input() term: StudyTerm;

    public feedbackText: string;
    
    feedback() {
      this.enableFeedback = true;
    }

    submitFeedback() {
      this.feedbackSubmitted = true;
      this.enableFeedback = false;
      this.feedbackText = null;

      if (this.feedbackText != null) {
        let feedback = new Feedback();
        feedback.examId = this.examid;
        feedback.text = this.feedbackText;
        feedback.question = this.currentQuestion;
        feedback.term = this.term;

        this._examService.submitFeedback(feedback)
          .subscribe(
            response => {},
            error => {}
        );
      }
    }
}