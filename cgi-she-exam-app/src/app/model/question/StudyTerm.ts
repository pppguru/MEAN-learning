import {StudyTermInterface} from './../interface/StudyTerm.interface';

export class StudyTerm implements StudyTermInterface {
    public id: string;
    public value: string;
    public sourcelanguage: string;
    public translations: StudyTerm[];
    public display: boolean = false;
    public englishValue: string;
    public hasPlurals: boolean = false;
}