import {UserDto} from './user-dto.model';

export class CourseDto {
  id?: number;
  courseName?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  teacherDto?: UserDto;
}
