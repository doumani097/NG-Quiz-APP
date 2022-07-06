import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ExamModel } from "../Models/Exam.model";

@Injectable({providedIn: "root"})
export class ExamService {

    subscribeExams = new Subject<ExamModel[]>();

    private exams: ExamModel[] = [
        new ExamModel(
            1, 
            "HTML", 
            "HTML (HyperText Markup Language) is the most basic building block of the Web.",
            "https://th.bing.com/th/id/R.f7c6c46d9ada84db77d452b3d65fdab5?rik=2NOie%2f5B5NuRQw&riu=http%3a%2f%2ffindicons.com%2ffiles%2ficons%2f2420%2fcoded%2f512%2fpage_html.png&ehk=mzeV4Cda%2fIwJnj39TZeY3%2b6Cq1%2f3BeLVuArOmZzK8PA%3d&risl=&pid=ImgRaw&r=0"),
        new ExamModel(
            2,
            "CSS",
            "CSS is the language we use to style an HTML document.",
            "https://th.bing.com/th/id/OIP.yUIb5S_kj98Eg5tT-Onx1AHaHa?pid=ImgDet&rs=1"
        )
    ];

    getExams(){
        return this.exams.slice();
    }

    getExam(id: number){
        let examIndex = this.exams.findIndex(e => e.id == id);
        return this.exams[examIndex];
    }

    addExam(exam: ExamModel){
        exam.id = this.getMaxId();
        this.exams.push(exam);
        this.subscribeExams.next(this.exams.slice());
    }

    updateExam(exam: ExamModel){
        let examIndex = this.exams.findIndex(e => e.id == exam.id);
        this.exams[examIndex] = exam;
        this.subscribeExams.next(this.exams.slice());
    }

    deleteExam(id: number){
        let examIndex = this.exams.findIndex(e => e.id == id);
        this.exams.splice(examIndex, 1);
        this.subscribeExams.next(this.exams.slice());
    }

    getMaxId(): number{
        var maxId = Math.max.apply(Math, this.exams.map((e) => { 
            return e.id; 
        }));

        return maxId + 1;
    }
}