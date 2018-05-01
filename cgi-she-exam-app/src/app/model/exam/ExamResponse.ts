import {SectionResponse} from './SectionResponse';

export class ExamResponse {
    constructor() {}

    id: string;
    examId: string;
    createdAt: Date;
    itemCount: number;
    pointsPossible: number;
    pointsAwarded: number;
    sections: SectionResponse[];
    relations: any;
}