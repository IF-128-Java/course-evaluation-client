import {UserDto} from './user-dto.model';

export class CourseDto {
  id?: number;
  courseName?: string;
  description?: string;
  endDate?: Date;
  startDate?: Date;
  teacherDto?: UserDto;
}
