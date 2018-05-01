import { AnswerInterface } from './../../interface/Answer.interface';

export class QuestionResponse implements AnswerInterface {
    constructor() {}

    questionId: string;
    sectionId: string;
    response: any[];
    responses: any[];
}