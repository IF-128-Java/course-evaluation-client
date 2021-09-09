import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FeedbackRequest} from "../../../models/feedbackrequest.model";
import {Question} from "../../../models/question.model";
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {FeedbackrequestService} from "../../../services/feedbackrequest.service";
import {CoursesService} from "../../../services/courses.service";
import {QuestionService} from "../../../services/question.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {DateAdapter} from "@angular/material/core";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {CreateQuestionComponent} from "../create-question/create-question.component";

@Component({
  selector: 'app-edit-feedbackrequest',
  templateUrl: './edit-feedbackrequest.component.html',
  styleUrls: ['./edit-feedbackrequest.component.css']
})
export class EditFeedbackrequestComponent implements OnInit {
  feedbackrequest: FeedbackRequest;
  public allQuestions: Question[] = [];
  public selectQuestions: Set<Question> = new Set<Question>();
  public id?: number;
  saved = false;
  selectable = true;
  removable = true;
  questionCtrl = new FormControl();
  public filteredQuestion: Observable<string[]>;
  courseId : number;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  minDate: Date;
  @ViewChild('questionInput') questionInput?: ElementRef<HTMLInputElement>;

  constructor(private feedbackrequestService: FeedbackrequestService, private courseService: CoursesService, private questionService: QuestionService, public dialog: MatDialog, private route: ActivatedRoute, private dateAdapter: DateAdapter<Date>, private router: Router) {
    this.dateAdapter.setLocale('en-GB');
    this.filteredQuestion = this.questionCtrl.valueChanges.pipe(
      startWith(null),
      map((q: string | null) => q ? this._filter(q) : this.allQuestions.map(q=>q.questionText).slice()));
    const currentTime = new Date().getTime();
    this.minDate = new Date(currentTime);}

  ngOnInit(): void {
    this.getFeedbackRequest(this.route.snapshot.params.feedbackRequestsId);
    this.courseService.get(parseInt(<string>this.route.snapshot.paramMap.get('id'))).subscribe(singleData=>{
        if(singleData!=null){
          this.courseId = singleData.id;
        }
      },
      error => {
        this.router.navigateByUrl('/admin/courses')
      })
    this.questionService.getAll().subscribe(data => {
      this.allQuestions = data;
    })
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.questionService.create(new Question(0, event.value, false))
        .subscribe((data: any) => {
          this.selectQuestions.add(data);
        })
    }
    event.chipInput!.clear();
    this.questionCtrl.setValue(null);
  }


  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectQuestionByName(event.option.value);
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allQuestions.map(q=>q.questionText).filter(option => option.toLowerCase().includes(filterValue));
  }

  private selectQuestionByName(question:any) {
    let foundQuestion = this.allQuestions.filter(q => q.questionText == question);
    if (foundQuestion.length) {
      this.selectQuestions.add(foundQuestion[0]);
    }
  }

  onSubmit(status: number) {
    this.feedbackrequest = new FeedbackRequest(this.feedbackrequest.id,this.feedbackrequest.feedbackDescription, this.range.value.start, this.range.value.end, this.courseId, status);
    this.feedbackrequestService.update(this.feedbackrequest).subscribe((data: any)  => {
        this.feedbackrequestService.addQuestionToFeedbackRequest(data.id, Array.from(this.selectQuestions)).subscribe()
        this.saved = true;
      },
      error => {
        console.log(error);
      })
  }

  getFeedbackRequest(feedbackRequestsId: number) {
    this.feedbackrequestService.getFeedbackRequestById(feedbackRequestsId).subscribe( data=>{
      this.feedbackrequest = data;
      this.feedbackrequestService.getQuestionsByFeedbackRequestId(data.id).subscribe(data =>{
          data.forEach( (q:Question) => {
            this.selectQuestions.add(q)
      });
      }
      )})
  }
}
