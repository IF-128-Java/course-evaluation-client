import {UserDto} from './user-dto.model';

export class GroupDto {
  id?: number
  groupName?: string
  students ?: UserDto[]
}
