import {Answers} from './answer.model';

export class Feedback {
  id?: number;
  date?: string;
  comment?: string;
  studentId?: string;
  studentName?: string;
  feedbackRequestId?: string;
  answers?: Answers[];
}
