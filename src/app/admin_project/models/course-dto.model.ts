import {UserDto} from './user-dto.model';

export class CourseDto {
  id?: number;
  courseName?: string;
  description?: string;
  endDate?: string;
  startDate?: string;
  teacherDto?: UserDto;
}
