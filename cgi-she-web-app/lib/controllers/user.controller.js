import bootbox from 'bootbox';
import angular from 'angular';
import _ from 'lodash';
import questionService from './../services/api.service';

export default class UserController {
constructor($timeout, api, notifications, auth) {  
    this.api = api;
    this.auth = auth;
    this.dobOpen = false;
    this.timeout = $timeout;
    this.users = [];
    this.isEditing = false;
    this.nationalities = [];
    this.user = null;
    this.usersLoading = true;
    this.userProcessing = false;
    this.notify = notifications;
    this.searchText = null;
    this.unfilteredUsers = [];
  }
  
  userSelect(selectedUser) {
      if (selectedUser.hasOwnProperty('dateOfBirth') && 
            selectedUser.dateOfBirth != null) {
          let birthDate = new Date(selectedUser.dateOfBirth);
          selectedUser['dobYear'] = birthDate.getFullYear().toString();
          let month = birthDate.getMonth() + 1;
          selectedUser['dobMonth'] = month.toString();
          let day = birthDate.getUTCDate();
          selectedUser['dobDay'] = day.toString();
      }
      
      if (selectedUser.relations.telephones.length > 0) {
          let telObject = selectedUser.relations.telephones[0];
          selectedUser['telCC'] = telObject.countryCode;
          selectedUser['telNumber'] = telObject.areaCode + telObject.number;
          selectedUser['telExt'] = telObject.extension;
      }
      
      if (selectedUser.relations.addresses.length > 0) {
          let addrObject = selectedUser.relations.addresses[0];
          selectedUser['addCity'] = addrObject.city;
          selectedUser['addState'] = addrObject.addState;
          selectedUser['addStreet'] = addrObject.addStreet;
          selectedUser['addZip'] = addrObject.addZip;
      }
      
      this.user = selectedUser;
  }
  
  addUser() {
      let newUser = {
          firstName: null,
          lastName: null,
          dobDay: null,
          dobMonth: null,
          dobYear: null,
          email: null,
          password: null,
          passwordConfirmation: null,
          gender: null,
          addStreet: null,
          addCity: null,
          addState: null,
          addZip: null,
          telCC: null,
          telNumber: null,
          telExt: null,
          nationalityId: null,
          addresses: [],
          telephones: [],
          id: null
      }
      
      this.users.splice(0,0,newUser);
      this.user = newUser;
  }
  
  delete() {
      this.userProcessing = true;
      let instance = this;
      
      this.api.deleteUser(this.user.id)
        .then(function (response) {
          instance.users.splice(instance.users.indexOf(this.user), 1);
          instance.user = null;  
          instance._deleteSuccessful();
          instance.unfilteredUsers = angular.copy(instance.users);
        });
  }
  
  cancel() {
      this.users.splice(0,1);
      this.unfilteredUsers = angular.copy(this.users);
      this.user = null;
  }
  
  save() {
    if (this.user.firstName == null || this.user.firstName.length == 0) {
      this.notify.showWarning('First Name is required');
      return;
    }
    
    if (this.user.lastName == null || this.user.lastName.length == 0) {
      this.notify.showWarning('Last Name is required');
      return;
    }
    
    if (this.user.email == null || this.user.email.length == 0) {
      this.notify.showWarning('Last Name is required');
      return;
    }
    
    if (this.user.id === null || this.user.changePassword) {
        if (this.user.password === null) {
            this.notify.showWarning('Password is required on user creation');
            return;
        }
    
        if (this.user.passwordConfirmation === null) {
            this.notify.showWarning('Password confirmation is required on user creation');
            return;
        }
        
        if (this.user.password !== this.user.passwordConfirmation) {
            this.notify.showWarning('Passwords do not match');
            return;
        }
    }
    
    if (this.user.dobDay != null && 
        this.user.dobMonth != null && 
        this.user.dobYear != null) {
            try {
                this.user['dateOfBirth'] = new Date(this.user.dobMonth + '/' + 
                this.user.dobDay + '/' + this.user.dobYear).toISOString();
            } catch (error) {
                console.log('Invalid date selected.  Not saved');
            }
        }
        
    if (this.user.telNumber !== null && this.user.telNumber.length > 0) {
        if (this.user.telNumber.length < 10) {
            this.notify.showWarning('Phone number must be 10 digits long');
            return;
        }
        
        this.user['telephones'] = [];
        this.user.telephones.push({
           countryCode: this.user.telCC,
           areaCode: this.user.telNumber.substring(0,3),
           number: this.user.telNumber.substring(3,10),
           extension: this.user.telExt 
        });
    }  
    
    if (this.user.addStreet != null && this.user.addStreet.length > 0) {
        this.user['addresses'] = [];
        this.user.addresses.push({
           street: this.user.addStreet,
           city: this.user.addCity,
           state: this.user.addState,
           postalCode: this.user.addZip 
        });
    }
    
    this.userProcessing = true;
       
    let instance = this;
    //send user object to server
    let userObject = angular.copy(this.user);
    
    if (this.user.hasOwnProperty('relations') && 
        this.user.relations.nationality.id)
        userObject['nationalityId'] = this.user.relations.nationality.id;
    else if (this.user.id === null) {
        delete userObject.nationalityId;
    }
    
    if (userObject.hasOwnProperty('relations')) 
        delete userObject.relations;
        
    delete userObject.dobDay;
    delete userObject.dobMonth;
    delete userObject.dobYear;  
    
    delete userObject.telCC;
    delete userObject.telExt;
    delete userObject.telNumber;  
    
    delete userObject.addCity;
    delete userObject.addState;
    delete userObject.addZip;
    delete userObject.addStreet;
    
    if (userObject.id === null)
        delete userObject.id;
        
    //if (userObject.addresses.length == 0) {
      //  delete userObject.addresses;
    //}
    
    if (userObject.hasOwnProperty('telephones')) {
        if (userObject.telephones.length == 0) {
            delete userObject.telephones;
        }
    }
    
    if (this.user.id === null) {
      this.api.createUser(userObject)
        .then(function (response) {
          //Set the ids from the server
          
          console.log(response);
          if (response !== undefined) {
            //instance.user.id = response.id;   
            instance._saveSuccessful();
            instance.unfilteredUsers = angular.copy(instance.users);
          }
        });
    } else {
      this.api.updateUser(userObject)
        .then(function (response) {
            if (response !== undefined)
              instance._saveSuccessful();
        }, function(error) {
            this.userProcessing = false;
        });
    }
  }
  
  userSearch() {
      let instance = this;
      this.user = null;
      if (this.searchText === null || this.searchText.length == 0) {
            this.users = angular.copy(this.unfilteredUsers);
        return;
      }
      
      let firstNameMatches = _.filter(this.unfilteredUsers, function(o) {
                                return _.startsWith(o.firstName.toLowerCase(), 
                                    instance.searchText.toLowerCase());
                            });
      let lastNameMatches = _.filter(this.unfilteredUsers, function(o) {
                                return _.startsWith(o.lastName.toLowerCase(), 
                                    instance.searchText.toLowerCase());
                            });
      let emailMatches = _.filter(this.unfilteredUsers, function(o) {
                                return _.startsWith(o.email.toLowerCase(), 
                                    instance.searchText.toLowerCase());
                            });
                            
      this.users = _.sortBy(_.uniqBy(_.union(firstNameMatches, lastNameMatches, emailMatches),'id',['firstName']));
  }
  
  init() {
      if (!this.auth.loggedIn())
           return;
           
    let instance = this;
    this.api.getUsers().then(function(collection) {
        instance.timeout(function() {
          instance.users = _.sortBy(collection, ['firstName']);
          instance.unfilteredUsers = angular.copy(instance.users);
          instance.usersLoading = false;
        });
      });
      
    this.api.getNationalities().then(function(collection) {
        instance.nationalities = collection;
    });   
  }
  
  submitEnabled() {
      return true;
  }
  
  _saveSuccessful() {
    this.notify.showSuccess('User saved successfully');
    this.userProcessing = false;
  }
  
  _deleteSuccessful() {
      this.notify.showSuccess('User deleted');
      this.userProcessing = false;
  }
}

UserController.$inject = ['$timeout','api','notifications','auth'];