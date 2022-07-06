import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ExamComponent } from './Quiz/exam/exam.component';
import { ExamDetailsComponent } from './Quiz/exam/exam-details/exam-details.component';
import { StartExamComponent } from './Quiz/start-exam/start-exam.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ExamComponent,
    ExamDetailsComponent,
    StartExamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
