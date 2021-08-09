import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FeedbackRequest} from "../../models/feedbackrequest.model";
import {FeedbackrequestService} from "../../services/feedbackrequest.service";
import {CoursesService} from "../../services/courses.service";
import {Course} from "../../models/course.model";
import {QuestionService} from "../../services/question.service";
import {Question} from "../../models/question.model";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";
import {map, startWith} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";


@Component({
  selector: 'app-add-feedbackrequest',
  templateUrl: './add-feedbackrequest.component.html',
  styleUrls: ['./add-feedbackrequest.component.css'],
})

export class AddFeedbackrequestComponent implements OnInit {

  feedbackrequest: FeedbackRequest = {
    feedbackDescription: 'sdfasdf',
    startDate: '2007-12-03T10:15:30',
    endDate: '2007-12-03T10:15:30',
    course: ''
  }
  public allCourse?: Course[]
  public questions: Question[] = []
  public patternQuestion: Question[] = this.questions.filter(q=>q.isPattern)
  public notPatternQuestion: Question[] = this.questions.filter(q=>!q.isPattern)
  public selectQuestions: Set<string> = new Set<string>()
  public id?: number
  saved = false
  selectable = true;
  removable = true;
  questionCtrl = new FormControl();
  filteredQuestion: Observable<string[]>;

  @ViewChild('questionInput') questionInput?: ElementRef<HTMLInputElement>;

  constructor(private feedbackrequestService: FeedbackrequestService, private courseService: CoursesService, private questionService: QuestionService) {
    this.filteredQuestion = this.questionCtrl.valueChanges.pipe(
      startWith(null),
      map((question: string | null) => question ? this._filter(question) : this.questions.map(q=>q.questionText).slice()));
  }

  ngOnInit(): void {
    this.courseService.getAll().subscribe(data => {
      this.allCourse = data;
      console.log(data);
    })
    this.questionService.getAll().subscribe(data => {
      this.questions = data;
      console.log(data)
    })
    for(let item of this.patternQuestion){
      this.selectQuestions.add(item.questionText);
    }
    console.log('select question' + this.selectQuestions)

  }

  onSubmit() {
    this.feedbackrequest = new FeedbackRequest(this.feedbackrequest.feedbackDescription, this.feedbackrequest.startDate, this.feedbackrequest.endDate, this.feedbackrequest.course);
    this.feedbackrequestService.create(this.feedbackrequest).subscribe(
      (data: any) => {
        console.log(this.feedbackrequest = data);
        let questionIds = this.questions.map(q => q.id);
        let questionName = Array.from(this.selectQuestions);
        this.feedbackrequestService.addQuestionToFeedbackRequest(this.feedbackrequest.id, questionName).subscribe()
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
      this.selectQuestions.add(value);
    }
    // Clear the input value
    event.chipInput!.clear();

    this.questionCtrl.setValue(null);
    console.log(this.selectQuestions)
  }


  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectQuestions.add(event.option.viewValue);
    // @ts-ignore
    this.questionInput.nativeElement.value = '';
    this.questionCtrl.setValue(null);
    console.log(this.selectQuestions)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.questions.map(q => q.questionText)
      .filter(q => q.toLowerCase()
        .includes(filterValue));
  }

  remove(question: string): void {
      this.selectQuestions.delete(question);
  }

}
