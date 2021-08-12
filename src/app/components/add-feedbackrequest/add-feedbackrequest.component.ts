import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FeedbackRequest} from '../../models/feedbackrequest.model';
import {FeedbackrequestService} from '../../services/feedbackrequest.service';
import {CoursesService} from '../../services/courses.service';
import {Course} from '../../models/course.model';
import {QuestionService} from '../../services/question.service';
import {Question} from '../../models/question.model';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {FormControl} from '@angular/forms';
import {CreateQuestionComponent} from '../create-question/create-question.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-add-feedbackrequest',
  templateUrl: './add-feedbackrequest.component.html',
  styleUrls: ['./add-feedbackrequest.component.css'],
})

export class AddFeedbackrequestComponent implements OnInit {

  feedbackrequest: FeedbackRequest = {
    feedbackDescription: '',
    startDate: '',
    endDate: '',
    course: '',
  }
  public allCourse?: Course[];
  public allQuestions: Question[] = [];
  public patternQuestion: Question[] = [];
  public selectQuestions: Set<Question> = new Set<Question>();
  public id?: number;
  saved = false;
  selectable = true;
  removable = true;
  questionCtrl = new FormControl();

  @ViewChild('questionInput') questionInput?: ElementRef<HTMLInputElement>;

  constructor(private feedbackrequestService: FeedbackrequestService, private courseService: CoursesService, private questionService: QuestionService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.courseService.getAll().subscribe(data => {
      this.allCourse = data;
    })
    this.questionService.getAll().subscribe(data => {
      this.allQuestions = data;
      this.patternQuestion = this.allQuestions.filter(q => q.pattern);
      this.patternQuestion.forEach(item => this.selectQuestions.add(item));
    })
  }

  onSubmit() {
    this.feedbackrequest = new FeedbackRequest(this.feedbackrequest.feedbackDescription, this.feedbackrequest.startDate, this.feedbackrequest.endDate, this.feedbackrequest.course);
    this.feedbackrequestService.create(this.feedbackrequest).subscribe(
      () => {
        this.feedbackrequestService.addQuestionToFeedbackRequest(this.feedbackrequest.id, Array.from(this.selectQuestions)).subscribe()
        this.saved = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our question
    if (value) {
      this.questionService.create(new Question(0, event.value, false))
        .subscribe((data: any) => {
          this.selectQuestions.add(data);
        })

    }
    // Clear the input value
    event.chipInput!.clear();
    this.questionCtrl.setValue(null);
  }


  selected(event: MatAutocompleteSelectedEvent): void {
    let question: Question = event.option.value;
    this.selectQuestions.add(question);
    if (this.questionInput) {
      this.questionInput.nativeElement.value = '';
    }
    this.questionCtrl.setValue(null);
  }

  remove(question: Question): void {
    if (!question.pattern) {
      this.questionService.deleteById(question.id).subscribe();
      this.selectQuestions.delete(question);
    }
  }

  addQuestion() {
    const dialogRef = this.dialog.open(CreateQuestionComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }

  reloadPage() {
    window.location.reload();
  }

}
