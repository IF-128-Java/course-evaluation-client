import {Component, OnInit, ViewChild} from '@angular/core';
import {FeedbackService} from '../../../services/feedback.service';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Feedback} from "../../../models/feedback.model";
import {Answers} from "../../../models/answer.model";
import {MatTableDataSource} from "@angular/material/table";
import {Question} from "../../../models/question.model";
import {QuestionService} from '../../../services/question.service';
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-show-feedback',
  templateUrl: 'showfeedback.component..html',
  styleUrls: ['showfeedback.component.css']
})
export class ShowfeedbackComponent implements OnInit {

  displayedColumns: string[] = ['Question', 'Rate'];
  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;

  listData: MatTableDataSource<any> = new MatTableDataSource<any>();

  feedbackId: number;

  answers: Answers[] = [];

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
    this.feedbackId = parseInt(<string>this.route.snapshot.paramMap.get('id'));

    this.getFeedback(this.feedbackId);
    console.log(this.feedbackId);
  }

  getFeedback(id: number): void {
    this.feedbackService.getFeedbackById(id).subscribe(data => {
        this.curFeedback = data;
        this.answers=data.answers;
        this.getAllAnswerToFeedback(id);
        this.listData = new MatTableDataSource(this.answers);
        setTimeout(() => this.listData.paginator = this.paginator);
      },
      error => {
        console.log(error);
      }
    );
  }

  getAllAnswerToFeedback(id: number): void {
      this.questionService.getAll().subscribe(
        response => {
          let questions: Question[] = response;
          if (questions != undefined) {
            questions.forEach(question => {
              let answer = this.answers.find(a => a.questionId == question.id);
              if (answer != undefined) {
                answer.questionName = question.questionText;
              }
            })
          }
        }
      )
    }
}
