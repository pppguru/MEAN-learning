import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RootApiUrl, AuthHeaderKey } from './../model/Constants';
import { ExamResponse } from './../model/exam/ExamResponse';
import { ExamSubmission } from './../model/exam/ExamSubmission';
import { Exam } from './../model/exam/Exam';
import { Feedback } from './../model/exam/Feedback';
import { AnswerInterface } from './../model/interface/Answer.interface';
import { AuthService } from './../services/auth.service';

@Injectable()
export class ExamService {
  constructor(private _http: Http,
             private _authService: AuthService) { }

  allExamScores() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append(AuthHeaderKey,this._authService.getToken());
    let userId = this._authService.getUser().id;

    return this._http.get(`${RootApiUrl}/users/${userId}/examination-results/all`, {
      headers: headers
    })
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  createExam(userid: string, examType: string) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append(AuthHeaderKey,this._authService.getToken());
    let payload = JSON.stringify({tier: 1, type: examType});
    
      return this._http.post(RootApiUrl + '/exams',payload, {
        headers: headers
      })
      //return this._http.get('/exam.json')
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  exam(examid: string) {
    let headers = new Headers();
    headers.append(AuthHeaderKey,this._authService.getToken());
    
      return this._http.get(`${RootApiUrl}/exams/{examid}`, {
        headers: headers
      })
      //return this._http.get('/exam.json')
      .map((response: Response) => <Exam>response.json())
      .catch(this.handleError);   
  }

  lastExamScore() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append(AuthHeaderKey,this._authService.getToken());
    let userId = this._authService.getUser().id;

    return this._http.get(`${RootApiUrl}/users/${userId}/examination-results/latest`, {
      headers: headers
    })
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
  
  submitExam(submission: ExamSubmission) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append(AuthHeaderKey,this._authService.getToken());
    let payload = JSON.stringify(submission);
    let userId = this._authService.getUser().id;
    
    return this._http.post(`${RootApiUrl}/exams/${submission.examId}/users/${userId}/submissions`, payload, {
      headers: headers
    })
      .map((response: Response) => <ExamResponse>response.json())
      .catch(this.handleError);
  }

  submitFeedback(feedback: Feedback) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append(AuthHeaderKey,this._authService.getToken());
    let payload = JSON.stringify(feedback);
    let userId = this._authService.getUser().id;
    
    return this._http.post(RootApiUrl + '/exams/feedback', payload, {
        headers: headers
      })
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }
}