import {CategoryScore} from './CategoryScore';

export class Score {
    constructor() {}

    public overallScore: string;
    public mcScore: string;
    public mcSpanishScore: string;
    public groupingScore: string;
    public matchingScore: string;
    public categoriesScore: CategoryScore[];
    public dateTaken: string;
    public percent: number;

    public overallPercent: string;
    public mcPercent: string;
    public mcSpanishPercent: string;
    public matchingPercent: string;
    public groupingPercent: string;

    public overallRight: number;
    public overallMissed: number;
    public mcEnglishRight: number;
    public mcEnglishWrong: number;
    public mcSpanishRight: number;
    public mcSpanishWrong: number;
    public groupingRight: number;
    public groupingWrong: number;
    public matchingRight: number;
    public matchingWrong: number;

    public overallPassed: boolean;
    public mcPassed: boolean;
    public mcSpanishPassed: boolean;
    public matchingPassed: boolean;
    public groupingPassed: boolean;

    public overallMessage: string;
}