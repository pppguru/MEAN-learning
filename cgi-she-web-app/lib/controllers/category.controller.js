import bootbox from 'bootbox';
import angular from 'angular';

export default class CategoryController {
  constructor($timeout, api, notifications, auth) {  
    this.api = api;
    this.auth = auth;
    this.timeout = $timeout;
    this.notify = notifications;
    
    this.categories = [];
    this.selectedCategory = null;
    this.categoriesLoading = true;

    this.selectedCategoryTerms = null;
    this.categoryTermsLoading = true;
  }
  
  init() {
    if (!this.auth.loggedIn())
        return;
           
    let instance = this;
    this.api.getCategories().then(function(collection) {
        instance.timeout(function() {
          instance.categories = _.sortBy(collection, ['name']);
          instance.categoriesLoading = false;
        });
      });

  }
  
  cancel() {
      this.categories.splice(0,1);
      this.selectedCategory = null;
      this.selectedCategoryTerms = null;
  }

  selectCategory() {
    this.categoryTermsLoading = true;
    let instance = this;
    this.api.getChoicesByCategory(this.selectedCategory.id).then(function(collection) {
        instance.timeout(function() {
          instance.selectedCategoryTerms = _.sortBy(collection, ['value']);
          instance.categoryTermsLoading = false;
        });
      });
  }
 
  createCategory() {
      this.categories.splice(0,0,this._categoryObject());
      this.selectedCategory = this.categories[0];
  }
  
  _categoryObject() {
      return {
          name: 'Category',
          id: null
      }
  }
  
  saveCategory() {
    let instance = this;
    
    if (instance.selectedCategory.id === null) {
        this.api.createCategory(instance.selectedCategory).then(function(response) {
            instance.selectedCategory.id = response.id;
            instance._saveSuccessful();
        });
    }
    else {
        this.api.updateCategory(instance.selectedCategory).then(function(response) {
            instance._saveSuccessful();
        });
    }
  }
  
  deleteCategory() {
      let instance = this;
      this.api.deleteCategory(this.selectedCategory).then(function (response) {
         instance.notify.showSuccess('Category Archived');
         instance.selectedCategory = null; 
         instance.selectedCategoryTerms = null;
      });
  }
  
  saveDisabled() {
      if (this.selectedCategory !== null)
        return this.selectedCategory.name.length == 0;
      return false;
  }
  
  _saveSuccessful() {
    this.notify.showSuccess('Category saved successfully');
  }
}

CategoryController.$inject = ['$timeout','api','notifications','auth'];
