import { AnswerModel } from "./Answer.model";

export class QuestionModel {

    constructor(
        public id: number, 
        public name: string,  
        public degree: number,
        public examId: number,
        public answers: AnswerModel[]
    ){}
}