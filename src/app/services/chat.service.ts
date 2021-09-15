import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConfig} from '../common/app-config';

@Injectable({
  providedIn: 'root'
})
export class ChatService{

  constructor(private  http: HttpClient) { }

  getMessagesForChat(chatId: number): Observable<any> {
    return this.http.get(`${AppConfig.API_ENDPOINT}chats/${chatId}`, {responseType: 'json'});
  }

  getTeacherChatRoomId(): Observable<any> {
    return this.http.get(`${AppConfig.API_ENDPOINT}chats/teacher`, {responseType: 'json'});
  }
}
