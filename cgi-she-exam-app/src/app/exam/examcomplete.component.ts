import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ExamResponseService} from './../services/examresponse.service';
import {Score} from './../model/exam/Score';
import {CategoryScore} from './../model/exam/CategoryScore';
import {AuthService as CGIAuth} from './../services/auth.service';

@Component({
  templateUrl: './examcomplete.html',
  providers: [ExamResponseService]
})
export class ExamCompleteComponent implements OnInit {
    
    constructor(private _router: Router,
               private _examResponse: ExamResponseService,
               private _authService: CGIAuth) 
               {}
    public doughnutChartType: string = 'doughnut';

    public doughnutChartLabels: string[] = ['Percent Wrong', 'Percent Correct'];
    public categories: CategoryScore[] = new Array();
    public overallData: number[] = new Array();
    public overallLabels: string[] = ['Correct','Missed'];
    public chartLabels: string[] = ['Correct','Missed'];
    public categoryChartOptions: any = { tooltips: { enabled: false } }

    public chartcolors: any[] = [{backgroundColor: ['rgba(39,174,96,0.2)','rgba(231,76,60,0.2)']}];

    public examScore: Score;

   ngOnInit() {
     this.examScore = this._examResponse.examResults();
     this.overallData.push(this.examScore.overallRight, this.examScore.overallMissed);
     this.categories = this.examScore.categoriesScore;
   }   

   iconStyle() {
     return this.examScore.overallPassed ? 'examSuccessIcon' : 'examFailIcon';
   }

   textColor() {
     return this.examScore.overallPassed ? 'examSuccess' : 'examFail';
   }

   didPass() {
     return this.examScore.overallPassed;
   }

   didFail() {
     return this.examScore.overallPassed === false;
   }

   selected(type: string): void {
    switch (type) {
      case 'study':
      if (this._authService.premierUser())
          this._router.navigate(['studydashboard']);
      else 
        this._router.navigate(['premiumupgrade']);  
      break;
      case 'exam':
        this._router.navigate(['examstart']);
      break;
      case 'performance':
        if (!this._authService.premierUser())
          this._router.navigate(['premiumupgrade']);
        else
          this._router.navigate(['examhistory']);
      break;
    }
   }
}