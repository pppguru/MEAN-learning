import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {ExamService} from './exam.service';
import {ExamStartParam, ExamShort, ExamNormal, ExamLong} from './../model/Constants';

@Component({
  templateUrl: './examstart.html',
  providers: [ExamService]
})
export class ExamStartComponent {
    
    constructor(private _examService: ExamService,
                private _router: Router
        ) {}
    

    quickTest() {
      this._navigateToExam(ExamShort);
    }

    normalTest() {
      this._navigateToExam(ExamNormal);
    }

    longTest() {
      this._navigateToExam(ExamLong);
    }

    _navigateToExam(examtype: string) {
      this._router.navigate(['exam', {ExamStartParam: examtype}]);
    }
}