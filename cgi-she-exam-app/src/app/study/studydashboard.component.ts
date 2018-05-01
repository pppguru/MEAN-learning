import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {SessionService} from './../services/session.service';
import {TermService} from './../services/term.service'

@Component({
  selector: 'studydashboard',  
  templateUrl: './studydashboard.html',
  providers: [TermService]
})
export class StudyDashboardComponent {
    
    constructor(private _router: Router,
                private _sessionService: SessionService,
                private _termService: TermService) {}

    selected(nav: string) {
        switch (nav) {
            case 'category':
              this._sessionService.setStudyRandom(false);
              this._router.navigate(['study']);
            break;
            case 'random':
            this._sessionService.setStudyRandom(true);
              this._router.navigate(['studyquestionchoice']);
            break;
            case 'performance':
              this._router.navigate(['examhistory']);
            break;
        }
    }   

  public downloadTerms() {
    return this._termService.download();
  }
}