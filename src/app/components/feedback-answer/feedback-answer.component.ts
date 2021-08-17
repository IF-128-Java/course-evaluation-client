import {Component, OnInit} from '@angular/core';
import {FeedbackService} from '../../services/feedback.service';
import {ActivatedRoute} from '@angular/router';
import {Answers} from '../../models/answer.model';
import {QuestionService} from '../../services/question.service';
import {Question} from '../../models/question.model';

@Component({
  selector: 'app-feedback-answer',
  templateUrl: './feedback-answer.component.html',
  styleUrls: ['./feedback-answer.component.css']
})
export class FeedbackAnswerComponent implements OnInit {
  private feedbackId?: number;
  answers: Answers[] = [];
  displayedColumns: string[] = ['Id', 'Question', 'Rate'];
  courseId?: number;
  feedbackRequestId?: number;

  constructor(private feedbackService:FeedbackService, private route: ActivatedRoute,private questionService: QuestionService) { }

  ngOnInit(): void {
    this.courseId = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.feedbackRequestId = parseInt(<string>this.route.snapshot.paramMap.get('feedbackRequestsId'));
    this.feedbackId = parseInt(<string>this.route.snapshot.paramMap.get('feedbackId'));
    this.feedbackService.getFeedbackById(this.feedbackId).subscribe(data =>{
      this.answers=data.answers;
      console.log(this.answers);
      this.getAnswer();
      }
    )
  }
  getAnswer() {
    this.questionService.getAll().subscribe(
      response => {
        let questions: Question[] = response;
        console.log(questions);
        if (questions != undefined) {
          questions.forEach(q => {
            let answer = this.answers.find(a => a.questionId == q.id);
            answer!.questionName = q.questionText;
          })
        }
      }
    )
  }
}
