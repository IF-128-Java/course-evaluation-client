import {Component, OnInit} from '@angular/core';
import {Question} from '../../../models/question.model';
import {QuestionService} from '../../../services/question.service';
import {NotificationMessageComponent} from '../notification-message/notification-message.component';
import {MatDialog} from '@angular/material/dialog';

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

  constructor(private questionService: QuestionService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.question = new Question(0, this.question.questionText, this.question.pattern);
    this.questionService.create(this.question).subscribe(data => {
      let question: Question = <Question>data;
      this.alertMessage('Success add!', 'Question : ' + question.questionText + '. Pattern : ' + question.pattern)
      this.question.id = 0;
      this.question.questionText = '';
    }
    );

  }

  OnChange($event: any){
    this.question.pattern=$event.checked;
  }

  alertMessage(h1:string, text: string) {
    const dialogRef = this.dialog.open(NotificationMessageComponent, {
      width: '50%',
      data: {h1: h1, text: text}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}
