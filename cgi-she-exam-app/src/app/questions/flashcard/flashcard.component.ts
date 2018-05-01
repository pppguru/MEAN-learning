import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {StudyTerm} from './../../model/question/StudyTerm';
import {FeedbackComponent} from './../feedback/feedback.component';

declare var iSpeechTTS: any;

@Component({
  selector: 'flashcard',
  providers: [],
  templateUrl: './flashcard.html'
})
export class FlashcardComponent implements OnInit {
  @Input() terms: StudyTerm[];
  
  private _translations: StudyTerm[];
  public currentTranslation: StudyTerm;
  public showCards: boolean = false;
  public term: StudyTerm;
  public showAnswer: boolean = false;
  public SpanishToEnglish: boolean = true;
  
  public enableFeedback: boolean = false;
  public feedbackSubmitted: boolean = false;

  private _tts: any;
  private _count = 0;

  ngOnInit() {
      let audioPlayer = document.getElementById('audioPlayer');
      this._tts = new iSpeechTTS(audioPlayer, {
            apiKey: 'a4bf1a576382f5e3d671243e5fbbc072',
            voice: 'usspanishfemale'
      });

      this.showCards = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
        if(changes['terms']) {
          if (this.terms === undefined)
            return;

            if (this.terms.length > 0) {
              this.term = this.terms[0];
              this._translations = this.term.translations;
              this.currentTranslation = this._translations[0];
              this.showCards = true;

              this.enableFeedback = false;
              this.feedbackSubmitted = false;
            }
        }
    }

  tapped() {
    this.term.display = true;
  }

  next() {
    this._count++;
    this.term = this.terms[this._count];
    this._translations = this.term.translations;
    this.currentTranslation = this._translations[0];
    this.terms[this._count - 1].display = false;

    this.enableFeedback = false;
    this.feedbackSubmitted = false;
  }

  displayNext() {
    return this._count < this.terms.length - 1;
  }

  play() {
    this._tts.speak(this.term.value);
  }

  showHideAnswer() {
    if (this.showAnswer)
      this.showAnswer = false;
    else
      this.showAnswer = true;
  }

  public switchTerms() {
    this.SpanishToEnglish = !this.SpanishToEnglish;
  }

  public termSwitchText() {
    return this.SpanishToEnglish ? 'Spanish -> English' : 'English -> Spanish';
  }
}