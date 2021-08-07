import {Injectable} from '@angular/core';
import {AppConfig} from '../../common/app-config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Group} from '../../models/group.model';
import {GroupDto} from '../models/group-dto.model';
import {UserDto} from '../models/user-dto.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private url = AppConfig.API_ADMIN_ENDPOINT + 'groups';

  constructor(private http: HttpClient) {

  }

  getGroups(): Observable<any> {
    return this.http.get(this.url);
  }

  getById(id: number): Observable<GroupDto> {
    return this.http.get(this.url + '/' + id);
  }

  public delete(group: Group): Observable<any> {
    return this.http.delete(this.url + '/' + group.id)
  }

  create(groupName: string | undefined) {
    return this.http.post(this.url, groupName)
  }

  removeStudent(groupId: number | undefined, students: UserDto[]) {
    return this.http.patch(this.url+'/'+groupId+'/remove-students',students)
  }

  addStudent(groupId: number | undefined, students: UserDto[]) {
    return this.http.patch(this.url+'/'+groupId+'/add-students',students)
  }
}
