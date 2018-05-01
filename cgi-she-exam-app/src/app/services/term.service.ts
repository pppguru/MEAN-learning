import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RootApiUrl, AuthHeaderKey } from './../model/Constants';
import { AuthService } from './../services/auth.service';
import { StudyTerm } from './../model/question/StudyTerm';
import { SessionService } from './session.service';
import { EventService } from './../services/event.service';
import * as FileSaver from 'file-saver';
var _ = require('lodash');

@Injectable()
export class TermService {
  constructor(private _http: Http,
              private _authService: AuthService,
              private _sessionService: SessionService,
              private _eventService: EventService) { }

  questionsByType(categories: any[], qType: string, count: number) {
    let header = new Headers();
    header.append(AuthHeaderKey,this._authService.getToken());  

    if (qType === 'Grouping')
      qType = 'Category Matching';

    if (qType === 'Matching')
      qType = 'Term Matching';

    let url = '';
    let body = {
      'length': 100,
      'sections': [],
      'categories': []
    }

    body.sections.push(qType);

    body.categories = new Array();

    for (let i = 0; i < categories.length; i++) {
      body.categories.push(categories[i].id);
    }

    url = `${RootApiUrl}/exams/practice`;
    return this._http.post(url, body, {
      headers: header
    })
    .map((response: Response) => <any>response.json())
    .catch(this.handleError);
  }

  termsByCategory(categories: any[], language: string, count: number) {    
    let header = new Headers();
    header.append(AuthHeaderKey,this._authService.getToken());  

    let url = '';
    if (this._sessionService.getStudyRandom()) {
      if (language != null)
        url = `${RootApiUrl}/terms/languages/${language}?withTranslations=true&count=${count.toString()}&randomByCategory=true`;
      else
        url = `${RootApiUrl}/terms?count=${count.toString()}&randomByCategory=true`;      
    }
    else {
      const catarray = this.catArray(categories);

      if (language != null)
        url = `${RootApiUrl}/terms/languages/${language}?withTranslations=true&count=${count.toString()}&categories=${catarray}`;
      else
        url = `${RootApiUrl}/terms?count=${count.toString()}&categories=${catarray}`;
    }

    return this._http.get(url, {
      headers: header
    })
      .map((response: Response) => <any>response.json())
      //.do(data => console.log(data))
      .catch(this.handleError);
  }

  studyTermCollection(terms: any): StudyTerm[] {
    let studyTerms: StudyTerm[] = new Array();

    for (let i = 0; i < terms.length; i++) {
      let source = terms[i];
      let studyTerm = new StudyTerm();
      studyTerm.id = source.id;
      studyTerm.value = source.value;
      studyTerm.sourcelanguage = source.relations.language.name;
      studyTerm.translations = new Array();

      for (let j = 0; j < terms[i].relations.englishTranslations.length; j++) {
        let translation = terms[i].relations.englishTranslations[j];
        let ts = new StudyTerm();
        ts.id = translation.id;
        ts.value = translation.value;
        ts.sourcelanguage = translation.relations.language.name;
        studyTerm.translations.push(ts);
      }

      studyTerms.push(studyTerm);
    }

    return _.shuffle(studyTerms);
  }

  public download(): any {
    this._eventService.broadcast('info','Please be patient.  Your download will begin shortly.');
    const headers = new Headers();
    headers.append(AuthHeaderKey, this._authService.getToken());
    headers.append('accept', 'application/pdf');
    return this._http
      .get(`${RootApiUrl}/terms/export/all`, { headers, responseType: ResponseContentType.Blob  })
      .subscribe(response => {
        if (response.status === 200) {
          this.saveFile(new Blob([response.blob()], { type: 'application/pdf' }));
        } else {
          alert('Sorry, we were unable to download the list of terms.');
        }
      });
  }

  private catArray(categories: any): string {
      let catarray : string = categories
            .map((c) => {return c.id; })
            .reduce((prev, curr) => {
        return `${prev}&categories=${curr}`;
      }); 

      return catarray;
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }

  private saveFile(response: any) {
    FileSaver.saveAs(response, 'terms-list.pdf');
    const fileURL = URL.createObjectURL(response);
    window.open(fileURL);
  }

}
