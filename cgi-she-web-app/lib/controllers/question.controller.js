import bootbox from 'bootbox';
import angular from 'angular';
import questionService from './../services/api.service';

export default class QuestionController {
  constructor($timeout, api, notifications) {  
    this.api = api;
    this.timeout = $timeout;
    this.questions = [];
    this.selectedType = 'multipleChoice';
    this.isEditing = false;
    this.phases = [1,2,3];
    this.question = {};
    this.questionsLoading = true;
    this.notify = notifications;
  }
  
  addQuestion() {
    this.isEditing = true;
    var newQuestion = this._newQuestionObject();
    this.questions.push(newQuestion);
    this.question = newQuestion;
  }
  
  typeChanged() {
    
  }
  
  questionSelect(index) {
      this.question = this.questions[index];
      this.isEditing = true;
  }
  
  saveDisabled() {
    return this.question.title.length == 0 || this.question.answer.length == 0;
  }
  
  saveQuestion() {
    if (this.question.title.length == 0) {
      this.notify.showWarning('Title is required');
      return;
    }
    
    if (this.question.answer.length == 0) {
      this.notify.showWarning('Answer is required');
      return;
    }
    
    let instance = this;
    
    //send question object to server
    
    if (this.question.id === null) {
      this.api.createQuestion(this.question)
        .then(function (response) {
          //Set the ids from the server
          instance.question.id = response.id;
          instance.question.createdAt = response.createdAt;
          instance.question.updatedAt = response.updatedAt;
          
          instance._saveSuccessful();
        });
    } else {
      this.api.updateQuestion(this.question)
        .then(function (response) {
          instance._saveSuccessful();
        });
    }
  }
  
  _saveSuccessful() {
    this.notify.showSuccess('Question saved successfully');
  }
  
  _newQuestionObject() {
    return {
      type:  this.selectedType,
      id: null,
      version: null,
      text: '',
      phase: '1',
      answer: '',
      active: true,
      createdAt: null,
      updatedAt: null
    }
  }
  
  init() {
    let instance = this;
    this.api.getQuestions().then(function(collection) {
        instance.timeout(function() {
          instance.questions = collection;
          instance.questionsLoading = false;
        });
      });
  }
}

QuestionController.$inject = ['$timeout','api','notifications'];