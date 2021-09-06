import {Component, OnDestroy, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {ActivatedRoute} from "@angular/router";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {AppConfig} from '../../../common/app-config';
import {Message} from '../../../models/message.model';
import {ChatService} from '../../../services/chat.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent implements OnInit, OnDestroy{
  private groupChatRoomId: string = '';
  private connectUrl: string = '';
  private subscribeUrl: string = '';
  private sendMessageUrl: string = '';
  private stompClient: any;
  currentUserId: string = '';
  messages: Message[] = []
  connected: boolean = false;
  message: string = '';

  selectedMessageId: number;
  readyToUpdate: boolean = false;

  error: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.groupChatRoomId = this.route.snapshot.params.id;
    this.connectUrl = AppConfig.API_ENDPOINT + 'connect-ws';
    this.subscribeUrl = '/api/v1/event/chats/' + this.groupChatRoomId;
    this.sendMessageUrl = '/api/v1/chats/' + this.groupChatRoomId;
    this.currentUserId = this.tokenStorage.getId();

    this.getMessages();

    this.initializeWebSocketConnection(this.connectUrl, this.subscribeUrl);
  }

  constructor(
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private location: Location
  ) { }

  initializeWebSocketConnection(connectUrl:string, subscribeUrl: string){
    let ws = new SockJS(connectUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({'Authorization' : 'Bearer ' + this.tokenStorage.getToken()}, () => {
      this.connected = true;
      this.stompClient.subscribe(subscribeUrl, (message: any) => {
        if(message.body) {
          let retrievedMessage = JSON.parse(message.body);
          let foundMessage = this.messages.find(message => message.id == retrievedMessage.id)
          if(foundMessage != undefined){
            foundMessage.content = retrievedMessage.content;
          }else {
            this.messages.push(retrievedMessage);
          }
        }
      });
    });
  }

  checkIfValid() : boolean{
    if(this.message.trim().length < 1){
      this.error = true;
      this.errorMessage = "Message can't be empty!";
      this.message = '';
      return false;
    }else if(this.message.length > 255){
      this.error = true;
      this.errorMessage = "Maximum message size is 255!";
      return false;
    }

    return true;
  }

  sendMessage(){
    if(!this.checkIfValid()){
      return;
    }

    this.stompClient.send(this.sendMessageUrl , {}, JSON.stringify({content: this.message}));
    this.error = false;
    this.message = '';
  }

  sendUpdatedMessage(){
    if(!this.checkIfValid()){
      return;
    }

    this.stompClient.send(this.sendMessageUrl + "/messages/" + this.selectedMessageId , {}, JSON.stringify({content: this.message}));
    this.readyToUpdate = false;
    this.error = false;
    this.message = '';
  }

  selectMessageToUpdate(selectedMessageToUpdate: Message){
    this.error = false;
    this.readyToUpdate = true;
    this.selectedMessageId = selectedMessageToUpdate.id!;
    this.message = selectedMessageToUpdate.content!;
  }

  cancelUpdate(){
    this.error = false;
    this.message = '';
    this.readyToUpdate = false;
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
    this.stompClient.disconnect(()=>{}, {});
  }

  back(){
    this.location.back();
  }
}
