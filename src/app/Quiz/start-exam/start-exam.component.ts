import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { interval } from 'rxjs';
import { AnswerModel } from 'src/app/Data/Models/Answer.model';
import { QuestionModel } from 'src/app/Data/Models/Question.model';
import { ExamDetailsVM } from 'src/app/Data/Models/ViewModels/ExamDetails.model';
import { ExamService } from 'src/app/Data/Services/Exam.service';
import { QuestionService } from 'src/app/Data/Services/Question.service';

@Component({
  selector: 'app-start-exam',
  templateUrl: './start-exam.component.html',
  styleUrls: ['./start-exam.component.css']
})
export class StartExamComponent implements OnInit, OnDestroy {

  examId!: number;
  examDetails!: ExamDetailsVM;
  questions!: QuestionModel[];
  currentQuestion: number = 0;
  question!: QuestionModel;
  points: number = 0;
  counter: number = 60;
  interval$: any;
  progress: string = "0";
  quizFinished: boolean = false;

  constructor(private route: ActivatedRoute, private questionService: QuestionService, private examService: ExamService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.examId = params['id'];
      this.getQuestionsByExam();
      this.getExamDetails();
    });

    this.startCounter();
  }

  getExamDetails(){
    let exam = this.examService.getExam(this.examId);
    let totalQuestions = this.questionService.getTotalQuestionsByExam(this.examId);
    let totalDegree = this.questionService.getTotalDegreeQuestionsByExam(this.examId);
    this.examDetails = new ExamDetailsVM(exam, totalQuestions, totalDegree);
  }

  getQuestionsByExam(){
    this.questions = this.questionService.getQuestionsByExam(this.examId);
    this.question = this.questions[this.currentQuestion];
  }

  checkAnswer(answer: AnswerModel, degree: number){
    
    if(this.currentQuestion + 1 == this.questions.length){
      this.quizFinished = true;
      this.interval$.unsubscribe();
    }

    if(answer.isCorrect){
      this.points += degree;
    }
    this.currentQuestion++;
    this.question = this.questions[this.currentQuestion];
    this.getProgressPercentage();
  }

  //timer control
  startCounter(){
    this.interval$ = interval(1000).subscribe(value => {
      this.counter--;
      if(this.counter === 0){
        this.currentQuestion++;
        this.counter = 60;
        this.points -= 10; 
      }
    })
  }

  stopCounter(){
    this.counter = 0;
    this.interval$.unsubscribe();
  }

  resetCounter(){
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  resetQuiz(){
    this.resetCounter();
    this.counter = 60;
    this.points = 0;
    this.currentQuestion = 0;
    this.question = this.questions[this.currentQuestion];
    this.getProgressPercentage();
  }


  //progress control
  getProgressPercentage(){
    this.progress = ((this.currentQuestion/this.questions.length)*100).toString();
  }

  ngOnDestroy(): void {
    this.interval$.unsubscribe();
  }

}