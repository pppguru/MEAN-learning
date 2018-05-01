import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {CategoryService} from './../../services/category.service';
import {EventService} from './../../services/event.service';
import {Category} from './../../model/Category';
import {SessionService} from './../../services/session.service';
var _ = require('lodash');

@Component({
  selector: 'categories',
  providers: [CategoryService, EventService],
  templateUrl: './categories.html'
})
export class CategoriesComponent implements OnInit {
  constructor(private _categoryService: CategoryService,
              private _eventService: EventService,
              private _sessionService: SessionService) {}

    categories: Category[] = new Array();
    searchtext: string;
    loading: boolean = true;

    private _allCategories: Category[] = new Array();
    private _ids: string[] = new Array();
    private _chosenCategories: Category[] = new Array();

     @Output() categoriesChosen = new EventEmitter();

    ngOnInit() {

      if (this._sessionService.getAllCategories() !== undefined) {
        this.categories = this._sessionService.getAllCategories();
        for (let i = 0; i < this.categories.length; i++) {
          this.categories[0].selected = false;
        }
        this._allCategories = _.clone(this.categories);
        this.loading = false;
        return;
      }

      this._categoryService.categories()
      .subscribe(
          response => {
            this.categories = <Category[]>_.sortBy(response, function(o) { return o.name; });
            this._sessionService.setAllCategories(this.categories);
            this._allCategories = _.clone(this.categories);
            this.loading = false;
          },
          error => this._handleError(error, 'There was an error retrieving the categories')
      );
    }

    searchChanged() {
      const instance = this;

      if (this.searchtext == null || this.searchtext.length == 0) {
            this.categories = _.clone(this._allCategories);
        return;
      }
      
      this.categories = _.filter(this._allCategories, function(o) {
                                return _.startsWith(o.name.toLowerCase(), 
                                    instance.searchtext.toLowerCase());
                            });
    }

    selectCategory(category: Category) {
      if (category.selected) {
        category.selected = false;
        const catIndex = this._ids.indexOf(category.id);
        this._ids.splice(catIndex,1);
        this._chosenCategories.splice(catIndex,1);
      }
      else {
        category.selected = true;
        this._ids.push(category.id);
        this._chosenCategories.push(category);
      }
    }

    submit() {
        this.categoriesChosen.emit({
            cats: this._chosenCategories,
        });
    }

    submitDisabled() {
      return this._ids.length === 0;
    }

   _handleError(error, message) {
    this._eventService.broadcast('error', message);
    console.error(error);
  }
}
