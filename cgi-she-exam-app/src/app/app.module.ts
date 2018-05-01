import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

import { CommonModule }      from '@angular/common';

import {Ng2UiAuthModule, CustomConfig} from 'ng2-ui-auth';
import {ChartsModule} from 'ng2-charts/ng2-charts';

const DEFAULT_POST_HEADER: {[name: string]: string} = {
  'Content-Type': 'application/json'
};

import { App as AppComponent } from './app.component';

import {AgreementComponent} from './study/agreement.component';
import {AccountComponent} from './account/account.component';
import {AccountConfirmationComponent} from './account/accountconfirmation.component';
import {CategoriesComponent} from './study/category/categories.component';
import {ExamStartComponent} from './exam/examstart.component';
import {ExamComponent} from './exam/exam.component';
import {ExamCompleteComponent} from './exam/examcomplete.component';
import {ExamHistoryComponent} from './examhistory/examhistory.component';
import {MultipleChoice} from './questions/multiplechoice/multiplechoice.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {PremiumUpgradeComponent} from './premiumupgrade/premiumupgrade.component';
import {PremiumUpgrade} from './premiumupgrade/premiumupgrade';
import {RegisterStartComponent} from './register/registerstart.component';
import {RegisterComponent} from './register/register.component';
import {RegisterConfirmComponent} from './register/registerconfirm.component';
import {ForgotPasswordComponent} from './forgotpassword/forgotpassword.component';

import {StudyComponent} from './study/study.component';
import {StudyScoreComponent} from './study/studyscore.component';
import {StudyDashboardComponent} from './study/studydashboard.component';
import {StudyQuestionChoiceComponent} from './studyquestionchoice/studyquestionchoice.component';
import {Matching} from './questions/matching/matching.component';
import {Grouping} from './questions/grouping/grouping.component';
import {FillInBlankComponent} from './questions/fillinblank/fillinblank.component';
import {FlashcardComponent} from './questions/flashcard/flashcard.component';
import {FeedbackComponent} from './questions/feedback/feedback.component';
import {SelectionComponent} from './study/category/selection.component';

import { ROUTES } from './app.routes';
import { environment } from './../environments/environment';

export class MyAuthConfig extends CustomConfig {
    defaultHeaders = {'Content-Type': 'application/json'};
    baseUrl = environment.API_HOST;
    providers = {
          google: {clientId: environment.GOOGLE_CLIENT_ID, url: '/login/google'}, 
          facebook: {clientId: environment.FACEBOOK_CLIENT_ID, url: '/login/facebook'}}
}

import {CUSTOM_APP_PROVIDERS} from './app.providers';

// Application wide providers
const APP_PROVIDERS = [
  ...CUSTOM_APP_PROVIDERS,
];

import '../styles/app.scss';
import '../styles/account.scss';
import '../styles/categories.scss';
import '../styles/exam.scss';
import '../styles/examcomplete.scss';
import '../styles/examhistory.scss';
import '../styles/examstart.scss';
import '../styles/feedback.scss';
import '../styles/fillinblank.scss';
import '../styles/flashcard.scss';
import '../styles/forgotpassword.scss';
import '../styles/grouping.scss';
import '../styles/home.scss';
import '../styles/login.scss';
import '../styles/matching.scss';
import '../styles/multiplechoice.scss';
import '../styles/premiumupgrade.scss';
import '../styles/register.scss';
import '../styles/selection.scss';
import '../styles/study.scss';
import '../styles/studyquestionchoice.scss';

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent, LoginComponent, RegisterStartComponent, RegisterComponent,
                    ForgotPasswordComponent, ExamStartComponent, ExamComponent, ExamCompleteComponent,
                    ExamHistoryComponent, PremiumUpgrade, PremiumUpgradeComponent, 
                    FillInBlankComponent, FlashcardComponent,
                    FeedbackComponent, SelectionComponent,
                    StudyQuestionChoiceComponent,
                    StudyComponent, StudyScoreComponent, StudyDashboardComponent, 
                    AccountComponent, AccountConfirmationComponent, 
                    RegisterConfirmComponent, AgreementComponent, CategoriesComponent,
                    MultipleChoice, Matching, Grouping
  ],
  imports: [
    BrowserModule, FormsModule, 
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    HttpModule, 
    Ng2UiAuthModule.forRoot(MyAuthConfig), 
    CommonModule, ChartsModule
  ],
  providers: [...APP_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
