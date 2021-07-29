import {Injectable} from '@angular/core';
import {AppConfig} from '../common/app-config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Group} from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
private group =new Group('4','test');
  private groupUrl = AppConfig.API_ENDPOINT + 'groups';

  constructor(private http: HttpClient) {

  }

  getGroups(): Observable<any> {
    return this.http.get(this.groupUrl);
  }

  public delete(group: Group) :Observable<any>{
    return this.http.delete(this.groupUrl+'/'+group.id)
  }

  create(group: Group) {
    return this.http.post(this.groupUrl,group)
  }

}
