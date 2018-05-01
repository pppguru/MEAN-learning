import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService as CGIAuth} from './../services/auth.service';
import {ExamService} from './../exam/exam.service';
import {AnalyticsService} from './../services/analytics.service';
import {SessionService} from './../services/session.service';

@Component({
  selector: 'home',  
  providers: [ExamService],
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router,
              private _cgiAuth: CGIAuth,
              private _examService: ExamService,
              private _analytics: AnalyticsService,
              private _sessionService: SessionService) {
      
  }

  public examIconText: string;
  public studyIconText: string;
  public scoreIconText: string;
  public hasLastExam: boolean = true;
  public lastScore: string = "";
  public chartColors: any[] = [{backgroundColor: ['rgba(231,76,60,0.2)', 'rgba(39,174,96,0.2)']}];
  public chartData: number[] = new Array();
  public chartLabels: string[] = ['Missed','Correct'];
  public showLegend: boolean = false;

  public chartOptions:any = {
      responsive: true,
      maintainAspectRatio: false
    };

  ngOnInit() {
    //navigate to login screen if not logged in
    if (!this._cgiAuth.loggedIn()) {
      this._router.navigate(['login']);
      return;
    }

    this.chartData.push(0,100);

  this.examIconText = 'TAKE ANOTHER TEST';
   this.studyIconText = 'PURCHASE STUDY';
   this.scoreIconText = 'MOST RECENT RESULT';

   const context = this;
  
   if (this._sessionService.getLastExamResultChecked() &&
       this._sessionService.getLastExamResult() === undefined) {
     this._sessionService.setLastExamResultChecked();
       this._setNotResult();
    }
   else if (this._sessionService.getLastExamResult() !== undefined)
     this._setPoints(this._sessionService.getLastExamResult(), this);
   else {
   this._examService.lastExamScore()
      .subscribe(
          response => {
            context._sessionService.setLastExamResult(response);
            context._setPoints(response, context);
          },
          error => this._handleLastExamError(error)
        );
   }

   if (this._cgiAuth.premierUser()) {
     this.studyIconText = "STUDY GUIDE";
   }

   this._analytics.pageView('/home.html');
  }

  private _setPoints(response: any, context: any): void {
    if (response.pointsAwarded === 0) {
      context.lastScore = "0";
      this.chartData = [];
      this.chartData.push(100,0);
    }
    else {
      context.lastScore = Math.floor(((response.pointsAwarded / response.pointsPossible) * 100)).toString();
      this.chartData = [];
      this.chartData.push(response.pointsPossible - response.pointsAwarded, response.pointsAwarded);
    }
  }

  private _setNotResult(): void {
      this.hasLastExam = false;
      this.scoreIconText = 'NO PREVIOUS RESULT';
      this.examIconText = 'TAKE A TEST';
      this._sessionService.setLastExamResultChecked();
  }

  private _handleLastExamError(error) {
    if (error.status == 404) {
      this._setNotResult();
    }
  }

  takeTest() {
    this._router.navigate(['examstart']);
  }
  
  study() {
    if (this._cgiAuth.premierUser())
      this._router.navigate(['studydashboard']);
    else 
      this._router.navigate(['premiumupgrade']);
  }

  mostRecent() {
    if (!this._cgiAuth.premierUser())
      this._router.navigate(['premiumupgrade']);
    else
      this._router.navigate(['examhistory']);
  }

  scoreClass(length: number) {
    return this.lastScore.length == length;
  }
}
