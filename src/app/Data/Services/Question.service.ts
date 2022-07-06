import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AnswerModel } from "../Models/Answer.model";
import { QuestionModel } from "../Models/Question.model";

@Injectable({providedIn: "root"})
export class QuestionService {

    subscribeQuestions = new Subject<QuestionModel[]>();

    private questions: QuestionModel[] = [
        //html questions
        new QuestionModel(
            1,
            "What does HTML stand for?",
            5,
            1,
            [
                new AnswerModel(1, "Hyper Text Markup Language.", true),
                new AnswerModel(1, "Hyper Text Manage Language.", false),
                new AnswerModel(1, "Hyper Torrent Markup Language.", false)
            ]
        ),
        new QuestionModel(
            2,
            "Choose the correct HTML element for the largest heading:",
            3,
            1,
            [
                new AnswerModel(1, "<h6>.", false),
                new AnswerModel(1, "<h1>.", true),
                new AnswerModel(1, "<h>.", false)
            ]
        ),

        //css questions
        new QuestionModel(
            3,
            "What does CSS stand for?",
            2,
            2,
            [
                new AnswerModel(1, "Cascading Style Sheet.", true),
                new AnswerModel(1, "Capital Style Sheet.", false),
                new AnswerModel(1, "Cascade Style Sheets.", false)
            ]
        ),
        new QuestionModel(
            4,
            "Which HTML tag is used to define an internal style sheet?",
            5,
            2,
            [
                new AnswerModel(1, "<css>", false),
                new AnswerModel(1, "<link>", false),
                new AnswerModel(1, "<style>", true)
            ]
        ),
    ];

    getQuestions(){
        return this.questions.slice();
    }

    getQuestionsByExam(examId: number){
        return this.questions.filter(q => q.examId == examId);
    }

    addQuestion(question: QuestionModel){
        question.id = this.getMaxId();
        this.questions.push(question);
        this.subscribeQuestions.next(this.questions.slice());
    }

    updateQuestion(question: QuestionModel){
        let questionIndex = this.questions.findIndex(q => q.id == question.id);
        this.questions[questionIndex] = question;
        this.subscribeQuestions.next(this.questions.slice());
    }

    deleteQuestion(id: number){
        let questionIndex = this.questions.findIndex(q => q.id == id);
        this.questions.splice(questionIndex, 1);
        this.subscribeQuestions.next(this.questions.slice());
    }

    getTotalQuestionsByExam(examId: number): number{
        return this.questions.filter(q => q.examId == examId).length;
    }

    getTotalDegreeQuestionsByExam(examId: number): number{
        let questions =  this.questions.filter(q => q.examId == examId);
        let totalDegree = 0.0;
        questions.forEach(question => {
            totalDegree += question.degree;
        });
        return totalDegree;
    }

    getMaxId(): number{
        var maxId = Math.max.apply(Math, this.questions.map((q) => { 
            return q.id; 
        }));
        return maxId + 1;
    }
}