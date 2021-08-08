import {UserDto} from './user-dto.model';

export class StudentDto {
  userDto?:UserDto;
  groupId?:number;
  groupName?: string;
}
