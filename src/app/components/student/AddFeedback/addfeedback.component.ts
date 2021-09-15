import {Component, OnInit, ViewChild} from '@angular/core';
import {FeedbackService} from '../../../services/feedback.service';
import {FeedbackrequestService} from '../../../services/feedbackrequest.service';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Feedback} from "../../../models/feedback.model";
import {Answers} from "../../../models/answer.model";
import {MatTableDataSource} from "@angular/material/table";
import {Question} from "../../../models/question.model";
import {QuestionService} from '../../../services/question.service';
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-add-feedback',
  templateUrl: 'addfeedback.component.html',
  styleUrls: ['addfeedback,component.css']
})
export class AddfeedbackComponent implements OnInit {

  displayedColumns: string[] = ['Question', 'Rate'];
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;

  listData: MatTableDataSource<any> = new MatTableDataSource<any>();

  feedbackRequestId: number;
  courseId: number;

  answer: Answers;
  answers: Answers[] = [];
  questions: Question[] = [];

  curFeedback: Feedback = {
    id: 0,
    date: '',
    comment: '',
    studentId: '',
    studentName: '',
    feedbackRequestId: '',
    answers: []
  };


  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private feedbackService: FeedbackService,
    private questionService: QuestionService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.curFeedback.studentId = this.tokenStorage.getId();
    this.feedbackRequestId = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.curFeedback.feedbackRequestId = <string>this.route.snapshot.paramMap.get('id');
    this.courseId = parseInt(<string>this.route.snapshot.paramMap.get('idc'));
    this.getQuestionFromFeedbackRequest(this.feedbackRequestId);
  }

  getQuestionFromFeedbackRequest(id: number): void {
    this.questionService.getQuestionsByFeedbackRequestId(this.feedbackRequestId).subscribe(data => {
        this.questions = data;

        if (this.questions != undefined) {
            this.questions.forEach(question => {
              this.answers.push(new Answers(0, 0, question.id, question.questionText, 0));
          })
          this.curFeedback.answers = this.answers;
        }

        this.listData = new MatTableDataSource(this.curFeedback.answers);
        setTimeout(() => this.listData.paginator = this.paginator);

      },
      error => {
        console.log(error);
      }
    );
  }

  SaveFeedback(): void {
    this.feedbackService.create(this.curFeedback).subscribe(data => {
        this.router.navigateByUrl('/feedback_request/course/'+this.courseId);
      },
      error => {
        console.log(error);
      }
    );
  }

  CancelFeedback(): void {
    this.router.navigateByUrl('/feedback_request/course/'+this.courseId);
  }

}
