import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as _ from 'lodash';

import { ChessGameService } from './chess-game.service';
import { Challenge, ChessState, MoveAction } from '../chess-interfaces';
import { WebsocketPlayer } from '../players/websocket-player';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class ChessWebsocketService {

  public isLoggedIn: boolean = false;
  public isInGame: boolean;
  public challenge: Challenge;
  private playerName: string;
  private timer: number;
  private challengerIsThisPlayer: boolean = false;

  private socket: SocketIOClient.Socket;
  private socketId: string;
  
  // Users in lobby
  private users: string[] = [];

  private playablePlayer: WebsocketPlayer;
  private challengeActive: boolean = false;
  private playerActionSubscription: Subscription;

  constructor(private game: ChessGameService) {
    this.socket = io('/chess', {autoConnect: false});

    this.socket.on('set-socket-id', ({socketId}: {socketId: string}) => this.socketId = socketId);
    this.socket.on('set-users', (users: string[]) => this.setUsers(users));
    this.socket.on('user-added', (user: string) => this.addUser(user));
    this.socket.on('user-removed', (userId: string) => this.removeUser(userId));
    this.socket.on('set-state', (state: {state: ChessState, blackPlayer: string, whitePlayer: string}) => 
      this.setState(state)
    );

    this.socket.on('challenge', (challenge: Challenge) => {
      console.log('challenge received', challenge);
      this.challenge = challenge;
    });

    this.socket.on('challenge-cancelled', () => {
      // TODO: show message to user
      this.challenge = undefined;
    })

    this.socket.on('game-action', (action: {xStart: number, xEnd: number, yStart: number, yEnd: number}) => {
      console.log('game-action', action)
      const piece = this.game.board[action.yStart][action.xStart].piece;
      const tile = this.game.board[action.yEnd][action.xEnd];
      const activePlayer = <WebsocketPlayer> this.game.activePlayer;
      activePlayer.resolveAction({piece, tile});
      console.log('game-action');
    })

    this.socket.on('timer', (time: number) => {
      this.timer = time;
    })

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
    this.socket.once('connect', () => {
      console.log('connect');
      this.socket.emit('join-lobby', {username}, (err: string) => {
        if(err){
          // TODO
        }
        this.isLoggedIn = true;
        this.playerName = username;
      });
    });
  }

  leaveLobby(){
    this.socket.close();
    this.socket = undefined;
  }

  getPlayerColor(){
    return this.playablePlayer.color;
  }

  challengePlayer(username: string, timeLimit: number, maxRounds: number, row1: string, row2: string){
    return new Promise((resolve, reject) => {
      // Todo: remove test value
      this.socket.emit('challenge-player', {username, timeLimit: 10, maxRounds, row1, row2}, (error: string) => {
        if(error){
          // TODO: error handling
          console.log('Error: invalid action', error);
          reject(error);
        }else{
          resolve();
        }
      });
    });
  }

  cancelChallenge(){
    this.socket.emit('cancel-challenge');
  }

  acceptChallenge(){
    this.socket.emit('accept-challenge');
  }

  denyChallenge(){
    this.socket.emit('deny-challenge');
  }
  
  getUsers(){
    return this.users;
  }

  getTimer(){
    return this.timer;
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

  private setState({state, blackPlayer, whitePlayer}: {state: ChessState, blackPlayer: string, whitePlayer: string}){
    this.challenge = undefined;
    this.game.gamePaused = false;
    this.game.setState(state);
    
    this.game.whitePlayer.isPlayable = this.playerName === whitePlayer;
    this.game.blackPlayer.isPlayable = this.playerName === blackPlayer;
    this.game.whitePlayer.name = whitePlayer;
    this.game.blackPlayer.name = blackPlayer;

    this.playablePlayer = <WebsocketPlayer> (this.playerName === whitePlayer ? this.game.whitePlayer : this.game.blackPlayer);

    if(this.playerActionSubscription){ this.playerActionSubscription.unsubscribe() }
    this.playerActionSubscription = this.playablePlayer.actionDecision.subscribe(({piece, tile}: MoveAction) => {
      this.socket.emit('game-action', { xStart: piece.x, xEnd: tile.x, yStart: piece.y, yEnd: tile.y }, (success: boolean) => {
        // TODO: error handling
        console.log('action success', success)
      })
    })
  }
}
