import {Section} from './../exam/Section';

export interface QuestionInterface {
    type: string;
    id: string;
    text: string;
    section: Section;
}