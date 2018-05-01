import { QuestionResponse } from './../question/response/QuestionResponse';

export class ExamSubmission {
    constructor() {}

    examId : string;
    responses: QuestionResponse[];
}