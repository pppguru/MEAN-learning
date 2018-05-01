import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {StudyTerm} from './../../model/question/StudyTerm';
import {StudyScoreComponent} from './../../study/studyscore.component';
import {SessionService} from './../../services/session.service';
var _ = require('lodash');

declare var iSpeechTTS: any;

@Component({
  selector: 'fillinblank',
  providers: [],
  templateUrl: './fillinblank.html'
})
export class FillInBlankComponent {

  constructor(private _sessionService: SessionService) {}

  @Input() terms: StudyTerm[];
  
  public viewTranslate: boolean = false;
  public termInput: string;
  public success: boolean = false;
  public complete: boolean = false;
  public term: StudyTerm;
  public translationText: string;

  public enableFeedback: boolean = false;
  public feedbackSubmitted: boolean = false;
  public SpanishToEnglish: boolean = true;

  private _tts: any;
  private _count = 0;
  private _translationCount = 0;

  ngOnInit() {
      let audioPlayer = document.getElementById('audioPlayer');
      this._tts = new iSpeechTTS(audioPlayer, {
            apiKey: 'a4bf1a576382f5e3d671243e5fbbc072',
            voice: 'usspanishfemale'
      });

      this.viewTranslate = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
        if(changes['terms']) {
          if (this.terms === undefined)
            return;

            if (this.terms.length > 0) {
              this.term = this.terms[0];
              this.viewTranslate = true;

              this.enableFeedback = false;
              this.feedbackSubmitted = false;
              this._translationCount = 0;
              this.complete = false;
            }
        }
    }

  inputKey(e) {
    if (e.keyCode === 13)
      this.entered();
  }

  entered() {
    this.success = false;

    if (this.SpanishToEnglish) {
      for (let i = 0; i < this.term.translations.length; i++) {
        if (this.term.translations[i].value.toLowerCase() == this.termInput.toLowerCase()) {
          this.success = true;
          break;
        } else if (this.term.translations[i].value.includes(' ')) {
          const potentials: any[] = this.term.translations[i].value.split(' ');
          for (let j = 0; j < potentials.length; j++) {
            if (potentials[j].toLowerCase() === this.termInput.toLowerCase()) {
              this.success = true;
              break;
            }
          }
        }
      }
  
      if (!this.success) {
          for (let i = 0; i < this.term.translations.length; i++) {
            if (this.term.translations[i].value.includes('/')) {
              const potentials: any[] = this.term.translations[i].value.split('/');
              for (let j = 0; j < potentials.length; j++) {
                if (potentials[j].toLowerCase() === this.termInput.toLowerCase()) {
                  this.success = true;
                  break;
                }
              }
            }  
        }
      }
  } else {
    if (this.term.value.toLowerCase() === this.termInput.toLowerCase())
      this.success = true;

    if (!this.success && this.term.value.includes(' ')) {
      const potentials: any[] = this.term.value.split(' '); 
      _.forEach(potentials, function(potential) {
        if (potential.toLowerCase() === this.termInput.toLowerCase()) {
          this.success = true;
          return false;
        }
      });
    }
  }

    this.complete = true;
    const translationVerbage : string = this.term.translations.length == 1
      || !this.SpanishToEnglish ? 'translation' : 'translations';
    this.translationText = this.SpanishToEnglish ? 
      `${this.term.translations.length.toString()} ${translationVerbage}` : `1 ${translationVerbage}`;
    this._sessionService.setStudyCorrect(this.success,true);
  }

  next() {
    this._count++;
    this.term = this.terms[this._count];
    this.term.englishValue = _.shuffle(this.term.translations)[0].value;
    this.terms[this._count - 1].display = false;

    this.enableFeedback = false;
    this.feedbackSubmitted = false;
    this.complete = false;
    this._translationCount = 0;
    this.termInput = null;
  }

  displayNext() {
    return this._count < this.terms.length - 1;
  }

  resetTerms() {
    this._count = 0;

    this.term = this.terms[0];
    this.term.englishValue = _.shuffle(this.term.translations)[0].value;
    this.viewTranslate = true;
    this.complete = false;
    this.termInput = null;
    this._translationCount = 0;

    this.enableFeedback = false;
    this.feedbackSubmitted = false;
  }

  showAnswer() {
    if (this.SpanishToEnglish) {
      this.termInput = this.term.translations[this._translationCount].value;

    if (this._translationCount + 1 < this.term.translations.length)
      this._translationCount++;

    }
    else {
      this.termInput = this.term.value;
    }
  }

  giveCredit() {
    this.success = true;
    this._sessionService.setStudyCorrect(this.success,false);
  }

  public switchTerms() {
    this.SpanishToEnglish = !this.SpanishToEnglish;
    
    if (this._count == 0)
      this.resetTerms();
    else
      this.next();
  }

  public termSwitchText() {
    return this.SpanishToEnglish ? 'Spanish -> English' : 'English -> Spanish';
  }
}