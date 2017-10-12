import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { ChessGameService } from './chess-game.service';
import * as _ from 'lodash';

interface User{
  username: string, 
  userId: string
}

@Injectable()
export class ChessWebsocketService {

  public isLoggedIn: boolean = false;
  public isInGame: boolean;
  private socket: SocketIOClient.Socket;
  private socketId: string;
  
  // Users in lobby
  private users: string[] = [];

  constructor(private game: ChessGameService) {
    this.socket = io('/chess', {autoConnect: false});

    this.socket.on('set-socket-id', ({socketId}: {socketId: string}) => this.socketId = socketId);
    this.socket.on('set-users', (users: string[]) => this.setUsers(users));
    this.socket.on('user-added', (user: string) => this.addUser(user));
    this.socket.on('user-removed', (userId: string) => this.removeUser(userId));
    this.socket.on('set-state', game.setState);

    this.socket.on('reconnect', () => {
      console.log('reconnected');
      this.socket.emit('rejoin', {socketId: this.socketId});
    })

    this.socket.on('disconnect', () => {
      this.isLoggedIn = false;
      console.log('disconnected');
    })
  }

  joinLobby(username: string){
    this.socket.connect();
    this.socket.on('connect', () => {
      console.log('connect');
      this.socket.emit('join-lobby', {username})
      this.isLoggedIn = true;
    });
  }

  leaveLobby(){
    this.socket.close();
    this.socket = undefined;
  }
  
  getUsers(){
    return this.users;
  }

  private setUsers(users: string[]){
    console.log('set users', users);
    this.users = users;
    this.users.sort();
  }

  private addUser(username: string){
    console.log('add user')
    this.users.push(username);
    this.users.sort();
  }

  private removeUser(deletedUsername: string){
    console.log('remove user')
    this.users = _.filter(this.users, (username) => username !== deletedUsername);
  }
}
