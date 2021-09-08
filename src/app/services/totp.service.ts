import { Injectable } from '@angular/core';
import {AppConfig} from "../common/app-config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TotpInfo} from "../components/totp/totp-info";

const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class TotpService {


  private totpChangeStatusUrl = AppConfig.API_ENDPOINT + 'totp/change2faStatus';
  constructor(private  http: HttpClient) { }

  update2fa(totpRequest: TotpInfo): Observable<any> {
    return this.http.post(`${this.totpChangeStatusUrl}`, totpRequest, httpOptions);
  }
}
