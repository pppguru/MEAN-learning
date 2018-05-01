import { Injectable } from '@angular/core';
import { Category } from './../model/Category';
import { User } from './../model/User';
import { Exam } from './../model/exam/Exam';
import { ExamResponse } from './../model/exam/ExamResponse';
import { RegistrationStart } from './../model/RegistrationStart';

@Injectable()
export class SessionService {
  constructor() { }

  private static allCategories: Category[];
  private static currentUser: User;
  private static exam: Exam;
  private static examProgress: any;
  private static examResponse: ExamResponse;
  private static lastExamResult: any;
  private static lastExamResultChecked: boolean = false;
  private static registrationStart: RegistrationStart;
  private static selectedCategories: Category[];
  private static studyCorrect: number = 0;
  private static studyOverall: number = 0;
  private static studyRandom: boolean = false;

  public clearSessionInfo(): void {
    SessionService.lastExamResultChecked = false;
    SessionService.lastExamResult = undefined;
    SessionService.currentUser = undefined;
  }

  public getCategories() {
    return SessionService.selectedCategories;
  }

  public setCategories(categories: any) {
    SessionService.selectedCategories = categories.cats;
  }

  public getAllCategories() {
    return SessionService.allCategories;
  }

  public setAllCategories(categories: any):void {
    SessionService.allCategories = categories;
  }

  public getExam():Exam {
    return SessionService.exam;
  }

  public setExam(userExam: Exam):void {
    SessionService.exam = userExam;
  }

  public getExamResponse():ExamResponse {
    return SessionService.examResponse;
  }

  public setExamResponse(er: ExamResponse):void {
    SessionService.examResponse = er;
  }

  public getExamProgress():any {
    return SessionService.examProgress;
  }

  public setExamProgress(progress: any):void {
    SessionService.examProgress = progress;
  }

  public getLastExamResult(): any {
    return SessionService.lastExamResult;
  }

  public setLastExamResult(result: any): void {
    SessionService.lastExamResult = result;
  }

  public getLastExamResultChecked(): boolean {
    return SessionService.lastExamResultChecked;
  }

  public setLastExamResultChecked(): void {
    SessionService.lastExamResultChecked = true;
  }

  public getRegistrationStart():RegistrationStart {
    return SessionService.registrationStart;
  }

  public setRegistrationStart(rs: RegistrationStart):void {
    SessionService.registrationStart = rs;
  }

  public getStudyCorrect() :string {
    if (SessionService.studyCorrect == 0)
      return `0/${SessionService.studyOverall} (0%)`;
    else {
      const percent = Math.floor((SessionService.studyCorrect / SessionService.studyOverall) * 100);
      return `${SessionService.studyCorrect}/${SessionService.studyOverall} (${percent}%)`;
    }
  }

  public setStudyCorrect(correct: boolean, addToTotal: boolean = true):void {
    if (correct)
      SessionService.studyCorrect++;

   if (addToTotal)
     SessionService.studyOverall++;
  }

  public resetStudyScore(removeCorrect: boolean):void {
    if (removeCorrect)
      SessionService.studyCorrect--;
    
    SessionService.studyOverall--;
  }

  public getStudyRandom() {
    return SessionService.studyRandom;
  }

  public setStudyRandom(random: boolean) {
    SessionService.studyRandom = random;
  }

  public getUser() : User {
    return SessionService.currentUser;
  }

  public setUser(user: User) {
    SessionService.currentUser = user;
  }
}