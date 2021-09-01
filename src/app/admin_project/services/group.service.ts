import {Injectable} from '@angular/core';
import {AppConfig} from '../../common/app-config';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GroupDto} from '../models/group-dto.model';
import {UserDto} from '../models/user-dto.model';
import {CourseDto} from '../models/course-dto.model';
import {PageEvent} from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private url = AppConfig.API_ADMIN_ENDPOINT + 'groups';

  constructor(private http: HttpClient) {
  }

  getGroups(event: PageEvent): Observable<any> {
    const params = new HttpParams()
      .set('page', event.pageIndex)
      .set('size', event.pageSize)
    return this.http.get(this.url, {params});
  }

  getCoursesByGroupId(id: number , filter: string, event: PageEvent,order:string, direction:string, status:string[]): Observable<any> {
    const params = new HttpParams()
      .set('filter', filter)
      .set('page', event.pageIndex)
      .set('size', event.pageSize)
      .set('order', order)
      .set('direction', direction)
      .set('status',status.toString())
    return this.http.get<CourseDto[]>(this.url + '/' + id + '/courses',{params});
  }

  getAvailableByGroupId(id: number | undefined, filter: string, event: PageEvent): Observable<any> {
    const params = new HttpParams()
      .set('filter', filter)
      .set('page', event.pageIndex)
      .set('size', event.pageSize)
    return this.http.get<CourseDto[]>(this.url + '/' + id + '/available-courses', {params});
  }

  getById(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }

  create(groupName: string | undefined) {
    return this.http.post(this.url, groupName)
  }

  updateName(id: number, groupName: string | undefined) {
    return this.http.patch(this.url + '/' + id, groupName)
  }

  removeStudent(groupId: number | undefined, students: UserDto[]) {
    return this.http.patch(this.url + '/' + groupId + '/remove-students', students)
  }

  addStudent(groupId: number | undefined, students: UserDto[]) {
    return this.http.patch(this.url + '/' + groupId + '/add-students', students)
  }

  addCourse(group_id: number | undefined, course: CourseDto): Observable<GroupDto> {
    return this.http.patch<GroupDto>(this.url + '/' + group_id + '/add-course', course);
  }

  removeCourse(group_id: number | undefined, course: CourseDto): Observable<GroupDto> {
    return this.http.patch<GroupDto>(this.url + '/' + group_id + '/remove-course', course);
  }
}
