import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './../services/auth.service';
import {ExamService} from './../exam/exam.service';
import {ExamResponseService} from './../services/examresponse.service';
import {EventService} from './../services/event.service';
import {CategoryService} from './../services/category.service';
import {SessionService} from './../services/session.service';
import {AnalyticsService} from './../services/analytics.service';
import {ExamResponse} from './../model/exam/ExamResponse';
import {Category} from './../model/Category';
import {Score} from './../model/exam/Score';

var _ = require('lodash');

@Component({
  selector: 'examhistory',  
  providers: [ExamResponseService, ExamService, CategoryService],
  templateUrl: './examhistory.html'
})
export class ExamHistoryComponent implements OnInit {
    
    constructor(private _router: Router,
                private _authService: AuthService,
                private _examresponseService: ExamResponseService,
                private _examService: ExamService,
                private _eventService: EventService,
                private _categoryService: CategoryService,
                private _sessionService: SessionService,
                private _analyticsService: AnalyticsService) 
                {

                }

    private _results: ExamResponse[];
    public loading: boolean = true;
    public scores: Score[] = new Array();
    public categoryHistory: Category[] = new Array();

    public lineChartData:Array<any> = [{data: []}];

    public lineChartLabels:Array<any> = new Array();
    public lineChartOptions:any = {
      responsive: true,
        scales: { yAxes: [{
              ticks: {
                  min: 0,
                  max: 100,
                  stepSize: 10
              }
          }]
        }
    };

    public doughnutChartLabels: string[] = ['Percent Wrong', 'Percent Correct'];
    public chartcolors: any[] = [{backgroundColor: ['rgba(39,174,96,0.2)','rgba(231,76,60,0.6)']}];
    public lineChartColors: any = {backgroundColor: 'rgba(26,184,223,0.6)'};
    public chartLabels: string[] = ['Correct','Missed'];

    public categoryLabelAll: any[] = [];
    public categoryDataAll: Array<any> = [];

    private _categories: Category[];
    private _allScores: Score[] = new Array();
    
    ngOnInit() {
      if (!this._authService.premierUser()) {
        this._router.navigate(['premiumupgrade']);
        return;
      }

      if (this._sessionService.getAllCategories() !== undefined) {
        this._categories = this._sessionService.getAllCategories();
        this._scores();
      } else {
        this._categoryService.categories()
          .subscribe(
            response => {
              this._categories = <Category[]>response;
              this._sessionService.setAllCategories(this._categories);
              this._scores();
            },
            error => this._handleAllExamError(error)
        );
      }

      this._analyticsService.pageView('./examhistory.html');
    }

    _scores() {
          this._examService.allExamScores()
            .subscribe(
          response => {
            this._handleAllExamResponse(response);
          },
          error => this._handleAllExamError(error)
        );
    }

    _handleAllExamResponse(examResults: ExamResponse[]) {
      this._results = examResults;
      let scoreTemp: Score[] = new Array();
      for (let result of this._results) {
        const examResult = this._examresponseService.examHistoryResult(result);
        
        if (scoreTemp.length < 5)
          scoreTemp.push(examResult);
        
        this._allScores.push(examResult);
      }

      this.scores = scoreTemp.reverse();

      this.lineChartLabels = this.scores.map(label => label.dateTaken);
      const lineScores = this.scores.map(s => s.percent);
      
      this.lineChartData = [{data: lineScores, label: 'Percent Correct'}];

      //get aggregrate category score
      let categoryTemp: Category[] = new Array();
      for (let s of this.scores) {
        for (let cs of s.categoriesScore) {
          const exists = _.some(categoryTemp, function (c) {
            return c.id === cs.id;
          });

          if (!exists) {
            let newCat = new Category();
            newCat.id = cs.id;
            newCat.name = cs.name;
            newCat.correct = cs.correct;
            newCat.total = cs.total;
            
            if (cs.correct === 0)
              newCat.percent = '0';
            else
              newCat.percent = Math.round((cs.correct / cs.total) * 100).toString();

            categoryTemp.push(newCat);
          } else {
            let newCat = _.filter(categoryTemp, { 'id': cs.id })[0];

            newCat.correct += cs.correct;
            newCat.total += cs.total;
            
            if (cs.correct === 0)
              newCat.percent = 0;
            else
              newCat.percent = Math.round((newCat.correct / newCat.total) * 100).toString();
          }
        }
      }

      for (let cd of categoryTemp) {
        cd.chartData.push(cd.correct, cd.total - cd.correct);
      }

      this.categoryLabelAll = categoryTemp.map(l => l.name);
      this.categoryDataAll = categoryTemp.map(a => a.total);

      this.categoryHistory = categoryTemp;

      this.loading = false;
    }

    _handleAllExamError(error: any) {
      this._eventService.broadcast('error', 'There was an issue retrieving your history');
      console.error(error);
    }

  public examMessage(): string {
    return this.scores.length > 1 ? '(last 5 exams taken are shown)' : 
      (this.scores.length === 1 ? 'You have taken 1 exam' : 'You have not taken an exam');
  }

  public examTotalMessage(): string {
    return this.scores.length > 1 ? `You have taken a total of ${this.scores.length.toString()} exams ` : '';
  }

  public chartClicked(e:any):void {
    //console.log(e);
  }
 
  public chartHovered(e:any):void {
    //console.log(e);
  }
}