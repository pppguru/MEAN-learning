import bootbox from 'bootbox';
import angular from 'angular';
import _ from 'lodash';

export default class ChoiceController {
  constructor($timeout, api, notifications,auth) {  
    this.api = api;
    this.auth = auth;
    this.timeout = $timeout;
    this.choices = [];
    this.isEditing = false;
    this.choice = null;
    this.choicesLoading = true;
    this.phases = [{number: 1}, {number: 2}, {number: 3}];
    this.notify = notifications;
    this.searchText = null;
    this.unfilteredChoices = [];
    this.translation = null;
    this._selectedLanguage = null;
  }
  
  choiceSelect(selectedChoice) {
      this.choice = selectedChoice;
      let instance = this;

      this.api.getTranslationChoice(this._selectedLanguage == 'English' ? 'Spanish' : 'English', 
          this.choice.id)
      .then(function (response) {
        //Set the ids from the server
        instance.translation = response[0];   
      });
  }
  
  addChoice() {
      let newChoice = {
          text: 'New Term',
          translation: 'translation',
          phase: 1,
          active: true,
          id: null
      }
      
      this.choices.splice(0,0,newChoice);
      this.choice = newChoice;
  }
  
  cancel() {
      this.choices.splice(0,1);
      this.unfilteredChoices = angular.copy(this.choices);
      this.choice = null;
  }
  
  save() {
    if (this.choice.value.length == 0) {
      this.notify.showWarning('Choice is required');
      return;
    }
       
    let instance = this;

    this.api.updateChoice(this.choice)
      .then(function (response) {
        instance._saveSuccessful();
      });
  }
  
  textSearch() {
      let instance = this;
      this.choice = null;
      if (this.searchText === null || this.searchText.length == 0) {
            this.choices = angular.copy(this.unfilteredChoices);
        return;
      }
      
      let textMatches = _.filter(this.unfilteredChoices, function(o) {
                                return _.startsWith(o.value.toLowerCase(), 
                                    instance.searchText.toLowerCase());
                            });
                            
      let translationMatches = _.filter(this.unfilteredChoices, function(o) {
                                return _.startsWith(o.value.toLowerCase(), 
                                    instance.searchText.toLowerCase());
                            });
                            
      this.choices = _.sortBy(_.uniqBy(_.union(textMatches, translationMatches),'id',['value']));
  }
  
  init() {
      if (!this.auth.loggedIn())
        return;
      
      this._loadTerms('English');
      this._selectedLanguage = 'English';
  }

  language(lan) {
    this._loadTerms(lan);
    this._selectedLanguage = lan;
  }

  _loadTerms(lan) {
    this.choicesLoading = true;
    let instance = this;
    this.api.getChoicesByLanguage(lan).then(function(collection) {
        instance.timeout(function() {
          instance.choices = _.sortBy(collection, ['value']);
          instance.unfilteredChoices = angular.copy(instance.choices);
          instance.choicesLoading = false;
        });
      });
  }
  
  _saveSuccessful() {
    this.notify.showSuccess('Choice saved successfully');
  }
}

ChoiceController.$inject = ['$timeout','api','notifications','auth'];