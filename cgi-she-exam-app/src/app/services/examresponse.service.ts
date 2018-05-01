import {Exam} from './../model/exam/Exam';
import {Section} from './../model/exam/Section';
import {ExamResponse} from './../model/exam/ExamResponse';
import {MatchingQuestionType, 
     MultipleChoiceEnglishQuestionType,MultipleChoiceSpanishQuestionType,
     GroupingQuestionType, PassingScore} from './../model/Constants';
import {Score} from './../model/exam/Score';
import {CategoryScore} from './../model/exam/CategoryScore';
import {SessionService} from './../services/session.service';

import {Injectable} from '@angular/core';
var _ = require('lodash');

@Injectable()
export class ExamResponseService {
    constructor(private _sessionService: SessionService) {}

    examResults():Score {
        let er = this._sessionService.getExamResponse();
        let exam = this._sessionService.getExam();
        let score = new Score();
        let percentCorrect = 0;
        const categoriesUsed = exam.categories;

        percentCorrect = Math.floor((er.pointsAwarded / (er.pointsAwarded == 0 ? 0 : er.pointsPossible)) * 100);
        score.overallScore = `You scored  ${er.pointsAwarded.toString()} out of a possible ${er.pointsPossible.toString()} correct answers (${percentCorrect.toString()}%)`;
        score.overallPassed = percentCorrect < PassingScore ? false : true;
        score.overallMessage = score.overallPassed ? 'You have a passing score!' : 'Your score did not meet the 70% passing requirement. Please review your category results to identify specific areas of improvement.';
        score.overallRight = er.pointsAwarded;
        score.overallMissed = er.pointsPossible - er.pointsAwarded;
        score.categoriesScore = new Array();

        for (let section of er.sections) {
              for (var id in section.categoryResults) {
                  const examCategory = _.filter(categoriesUsed, { 'id': id })[0];
                  let scoreCategory = _.filter(score.categoriesScore, { 'id': id });

                  if (examCategory === undefined)
                      continue;

                  if (scoreCategory.length === 0) {
                      let cs = new CategoryScore();
                      cs.correct = section.categoryResults[id].correct;
                      cs.total = section.categoryResults[id].correct + section.categoryResults[id].incorrect;
                      cs.name = examCategory.name;
                      cs.id = id;
                      score.categoriesScore.push(cs);
                  } else {
                      scoreCategory[0].correct = section.categoryResults[id].correct + parseInt(scoreCategory[0].correct);
                      scoreCategory[0].total = scoreCategory[0].total + section.categoryResults[id].correct + 
                          section.categoryResults[id].incorrect;
                  }
              }
        }
        
        return score;
    }

    examHistoryResult(er: ExamResponse):Score {
        let score = new Score();
        let percentCorrect = 0;
        const categoriesUsed = this._sessionService.getAllCategories();

        if (er.pointsAwarded > 0)
            percentCorrect = Math.floor((er.pointsAwarded / (er.pointsPossible)) * 100);
        
        score.overallPassed = percentCorrect < PassingScore ? false : true;
        score.overallRight = er.pointsAwarded;
        score.overallMissed = er.pointsPossible - er.pointsAwarded;
        score.overallScore = `You scored  ${er.pointsAwarded.toString()} out of a possible ${er.pointsPossible.toString()} correct answers (${percentCorrect.toString()}%)`;
        score.categoriesScore = new Array();
        score.percent = percentCorrect;
        score.dateTaken = new Date(er.createdAt).toLocaleDateString();

        for (var categoryResult of er.relations.categoryResults) {
            const examCategory = _.filter(categoriesUsed, { 'id': categoryResult.categoryId })[0];
            let scoreCategory = _.filter(score.categoriesScore, { 'id': categoryResult.id });

            if (scoreCategory.length === 0) {
                let cs = new CategoryScore();
                cs.correct = categoryResult.correctCount;
                cs.total = categoryResult.correctCount + categoryResult.incorrectCount;
                cs.name = examCategory.name;
                cs.id = categoryResult.categoryId;
                score.categoriesScore.push(cs);
            } else {
                scoreCategory.correct = categoryResult.correctCount + parseInt(scoreCategory.correct);
                scoreCategory.total = scoreCategory.total + categoryResult.correctCount + 
                    categoryResult.incorrectCount; 
            }
        }
        
        return score;
    }
}