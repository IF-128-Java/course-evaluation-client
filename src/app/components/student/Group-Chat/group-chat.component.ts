import {Component, OnDestroy, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {ActivatedRoute} from "@angular/router";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {AppConfig} from '../../../common/app-config';
import {Message} from "../../../models/message.model";
import {ChatService} from "../../../services/chat.service";

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent implements OnInit, OnDestroy{
  private sendMessageUrl: string = '';
  private groupChatRoomId: string = '';
  private stompClient: any;
  message: string = '';

  messages: Message[] = []

  connected:boolean = false;

  ngOnInit(): void {
    this.groupChatRoomId = this.route.snapshot.params.id;

    this.sendMessageUrl = '/api/v1/chat/' + this.groupChatRoomId;

    this.getMessages();

    this.initializeWebSocketConnection(AppConfig.API_ENDPOINT + 'connect-ws', '/api/v1/event/chat/' + this.groupChatRoomId);
  }

  constructor(
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private chatService: ChatService,
  ) { }

  initializeWebSocketConnection(connectUrl:string, subscribeUrl: string){
    let ws = new SockJS(connectUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({'Authorization' : 'Bearer ' + this.tokenStorage.getToken()}, (frame: any) => {
      this.connected = true;
      console.log('Connected: ' + frame);
      this.stompClient.subscribe(subscribeUrl, (message: any) => {
        if(message.body) {
          this.messages.push(JSON.parse(message.body));
        }
      });
    });
  }

  sendMessage(){
    this.stompClient.send(this.sendMessageUrl , {}, JSON.stringify({content: this.message}));
    this.message = '';
  }

  getMessages(){
    this.chatService.getMessagesForGroupChat(+this.groupChatRoomId).subscribe(data => {
        this.messages = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    this.stompClient.disconnect(()=>{console.log('Disconnected')}, {});
  }
}
