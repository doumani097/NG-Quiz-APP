import { Component, OnInit } from '@angular/core';
import { ExamModel } from 'src/app/Data/Models/Exam.model';
import { ExamService } from 'src/app/Data/Services/Exam.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  exams!: ExamModel[];
  
  constructor(private examService: ExamService) { }

  ngOnInit(): void {
    this.exams = this.examService.getExams();
  }



}
