import { Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterStartComponent} from './register/registerstart.component';
import {RegisterComponent} from './register/register.component';
import {RegisterConfirmComponent} from './register/registerconfirm.component';
import {ForgotPasswordComponent} from './forgotpassword/forgotpassword.component';
import {ExamStartComponent} from './exam/examstart.component';
import {ExamComponent} from './exam/exam.component';
import {ExamCompleteComponent} from './exam/examcomplete.component';
import {ExamHistoryComponent} from './examhistory/examhistory.component';
import {PremiumUpgrade} from './premiumupgrade/premiumupgrade';
import {StudyComponent} from './study/study.component';
import {StudyQuestionChoiceComponent} from './studyquestionchoice/studyquestionchoice.component';
import {AgreementComponent} from './study/agreement.component';
import {StudyDashboardComponent} from './study/studydashboard.component';
import {AccountComponent} from './account/account.component';
import {AccountConfirmationComponent} from './account/accountconfirmation.component';

import {AuthGuardService} from './services/authguard.service';
import {StudyGuardService} from './services/studyguard.service';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registerstart', component: RegisterStartComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'registerconfirm', component: RegisterConfirmComponent, canActivate: [AuthGuardService]},
  { path: 'forgotpassword', component: ForgotPasswordComponent},
  { path: 'examstart', component: ExamStartComponent, canActivate: [AuthGuardService]},
  { path: 'exam', component: ExamComponent, canActivate: [AuthGuardService]},
  { path: 'examcomplete', component: ExamCompleteComponent, canActivate: [AuthGuardService]},
  { path: 'premiumupgrade', component: PremiumUpgrade, canActivate: [AuthGuardService]},
  { path: 'examhistory', component: ExamHistoryComponent, canActivate: [AuthGuardService]},
  { path: 'study', component: StudyComponent, canActivate: [StudyGuardService]},
  { path: 'studyquestionchoice', component: StudyQuestionChoiceComponent, canActivate: [StudyGuardService]},
  { path: 'studyagreement', component: AgreementComponent, canActivate: [AuthGuardService]},
  { path: 'studydashboard', component: StudyDashboardComponent, canActivate: [StudyGuardService]},
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardService] },
  { path: 'confirmation', component: AccountConfirmationComponent, canActivate: [AuthGuardService] }
];
