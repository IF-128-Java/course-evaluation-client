import {Component, OnInit} from '@angular/core';
import {Question} from '../../../models/question.model';
import {QuestionService} from '../../../services/question.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  question: Question = {
    id: 0,
    questionText: '',
    pattern: false,
  }

  constructor(private questionService: QuestionService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.question);
    this.question = new Question(0, this.question.questionText, this.question.pattern);
    this.questionService.create(this.question).subscribe(data => data);
    console.log(this.question)
  }

  OnChange($event: any){
    this.question.pattern=$event.checked;
  }
}
