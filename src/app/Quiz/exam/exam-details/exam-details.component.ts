import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ExamDetailsVM } from 'src/app/Data/Models/ViewModels/ExamDetails.model';
import { ExamService } from 'src/app/Data/Services/Exam.service';
import { QuestionService } from 'src/app/Data/Services/Question.service';

@Component({
  selector: 'app-exam-details',
  templateUrl: './exam-details.component.html',
  styleUrls: ['./exam-details.component.css']
})
export class ExamDetailsComponent implements OnInit {

  examId!: number;
  examDetails!: ExamDetailsVM;

  constructor(private route: ActivatedRoute, private examService: ExamService, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.examId = params['id'];
      this.getExamDetails();
    });
  }

  getExamDetails(){
    let exam = this.examService.getExam(this.examId);
    let totalQuestions = this.questionService.getTotalQuestionsByExam(this.examId);
    let totalDegree = this.questionService.getTotalDegreeQuestionsByExam(this.examId);
    this.examDetails = new ExamDetailsVM(exam, totalQuestions, totalDegree);
  }

}
