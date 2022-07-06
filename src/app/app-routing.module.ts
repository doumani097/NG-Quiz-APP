import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamDetailsComponent } from './Quiz/exam/exam-details/exam-details.component';
import { ExamComponent } from './Quiz/exam/exam.component';
import { StartExamComponent } from './Quiz/start-exam/start-exam.component';

const routes: Routes = [
  { path: '', redirectTo: '/exams', pathMatch: 'full'},
  { path: 'exams', component: ExamComponent },
  { path: 'exam-details/:id', component: ExamDetailsComponent },
  { path: 'start-exam/:id', component: StartExamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
