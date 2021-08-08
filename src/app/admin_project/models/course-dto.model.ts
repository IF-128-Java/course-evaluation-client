import {UserDto} from './user-dto.model';

export class CourseDto {
  id?: number;
  courseName?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  teacherDto?: UserDto;
}
