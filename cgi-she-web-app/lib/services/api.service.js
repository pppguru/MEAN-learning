import angular from 'angular';
import bootbox from 'bootbox';

class API {
  constructor($http, notifications) {
    this.rootUrl = process.env.API_HOST;
    this.rootExamUrl = this.rootUrl + '/examinations';
    this.rootChoiceUrl = this.rootUrl + '/terms';
    this.rootCategoryUrl = this.rootUrl + '/categories';
    this.rootLoginUrl = this.rootUrl + '/login';
    this.rootUserUrl = this.rootUrl + '/users';
    this.http = $http;
    this.notify = notifications;
  }
  
  /* login */
  userLogin(loginPayload) {
      let instance = this;
      return this.http.post(this.rootLoginUrl, loginPayload)
        .then(function(response) {
            return response.data;
            }, function(error) {
                if (error.status === 401) {
                    instance.notify.showWarning('Incorrect username and/or password'); 
                    return null;
                }
                console.error(error);
                instance.notify.showError('There was an issue calling the login service'); 
                return null;       
            });
  }
  
  /* choices */
  
    getChoices() {
        let instance = this;
        return this.http.get(this.rootChoiceUrl)
        .then(function(response) {
            return response.data;
            }, function(error) {
                console.error(error);
                instance.notify.showError('There was an issue retrieving the choices');        
            });
    }

    getTranslationChoice(language, id) {
        let instance = this;
        return this.http.get(this.rootChoiceUrl + '/' + id + '/translations/' + language)
        .then(function(response) {
            return response.data;
            }, function(error) {
                console.error(error);
                instance.notify.showError('There was an issue retrieving the choices');        
            });
    }

    getChoicesByLanguage(language) {
        let instance = this;
        return this.http.get(this.rootChoiceUrl + '/languages/' + language, {
            params: {
                associated: 'categories'
            }
        })
        .then(function(response) {
            return response.data;
            }, function(error) {
                console.error(error);
                instance.notify.showError('There was an issue retrieving the choices');        
            });
    }

    getChoicesByCategory(category) {
        let instance = this;
        return this.http.get(this.rootChoiceUrl, { 
            params: { categories : [ category ] }
        })
        .then(function(response) {
            return response.data;
            }, function(error) {
                console.error(error);
                instance.notify.showError('There was an issue retrieving the choices');        
            });
    }
    
    createChoice(choice) {
        let instance = this;
        return this.http.post(this.rootChoiceUrl,choice)
        .then(function(response) {
            return response.data;
            }, function(error) {
                console.error(error);
                instance.notify.showError('There was an issue creating the choice');  
            });
    }
  
  updateChoice(choice) {
    let instance = this;
     return this.http.put(this.rootChoiceUrl + '/' + choice.id, choice)
      .then(function(response) {
          return response.data;
        }, function(error) {
            console.error(error);
            instance.notify.showError('There was an issue saving the term');        
        });
   }
   
   /* Categories */
   
    getCategories() {
        let instance = this;
        return this.http.get(this.rootCategoryUrl)
        .then(function(response) {
            return response.data;
            }, function(error) {
                console.error(error);
                instance.notify.showError('There was an issue retrieving the categories');        
            });
    }  
    
    createCategory(category) {
        let instance = this;
        return this.http.post(this.rootCategoryUrl,category)
        .then(function(response) {
            return response.data;
            }, function(error) {
                console.error(error);
                instance.notify.showError('There was an issue creating the category');  
            });
    } 
    
   updateCategory(category) {
    let instance = this;
     return this.http.put(this.rootCategoryUrl + '/' + category.id)
      .then(function(response) {
          return response.data;
        }, function(error) {
            console.error(error);
            instance.notify.showError('There was an issue saving the category');        
        });
   }
   
   deleteCategory(category) {
       let instance = this;
       return this.http.delete(this.rootCategoryUrl + '/' + category.id)
        .then(function(response) {
            return response;
        }, function(error) {
            console.error(error);
            instance.notify.showError('There was an issue deleting the category');
        })
   }
   
   /* Users */
   createUser(user) {
        let instance = this;
        return this.http.post(this.rootUserUrl,user)
        .then(function(response) {
            return response.data;
            }, function(error) {
                console.error(error);
                instance.notify.showError('There was an issue creating the user');  
            });
   }
   
   deleteUser(id) {
        let instance = this;
        return this.http.delete(this.rootUserUrl + '/' + id)
        .then(function(response) {
            return response.data;
            }, function(error) {
                console.error(error);
                instance.notify.showError('There was an issue deleting the user');  
            });
   }
   
   getUser(id) {
        let instance = this;
        return this.http.get(this.rootUserUrl + '/' + id)
        .then(function(response) {
            return response.data;
            }, function(error) {
                console.error(error);
                instance.notify.showError('There was an issue retrieving the users');        
            });         
   }
   
   getUsers() {
        let instance = this;
        return this.http.get(this.rootUserUrl)
        .then(function(response) {
            return response.data;
            }, function(error) {
                console.error(error);
                instance.notify.showError('There was an issue retrieving the users');        
            });     
   }
   
   updateUser(user) {
     let instance = this;
     return this.http.put(this.rootUserUrl + '/' + user.id, user)
      .then(function(response) {
          return response.data;
        }, function(error) {
            console.error(error);
            instance.notify.showError('There was an issue saving the user');        
        });
   }
   
   getNationalities() {
       let instance = this;
       return this.http.get(this.rootUrl + '/nationalities')
        .then(function(response) {
            return response.data;
            }, function(error) {
                console.error(error);
                instance.notify.showError('There was an issue retrieving nationalities');        
            }); 
   }
   
}

API.$inject = ['$http','notifications'];

export default angular.module('services.api', [])
  .service('api', API)
  .name;