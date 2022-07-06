import { ExamModel } from "../Exam.model";

export class ExamDetailsVM {
    constructor(public exam: ExamModel, public totalQuestions: number, public totalDegree: number){ }
}