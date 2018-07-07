// import {Injectable} from '@angular/core';
// import {HttpClient} from '@angular/common/http';
// import {Observable} from 'rxjs/Observable';
//
// // var SockJs = require('sockjs-client');
// // var Stomp = require('stompjs');
//
// const SOCKET_URL = `http://localhost:8080/socket`;
// const NOTIFY_URL = 'http://localhost:8080/notify';
//
// let SockJs = require('sockjs-client');
// let Stomp = require('stompjs');
//
// @Injectable()
// export class WebSocketService {
//
//
//   constructor(private http: HttpClient) {
//   }
//
//   connect() {
//     let socket = new SockJs(SOCKET_URL);
//     let stompClient = Stomp.over(socket);
//     return stompClient;
//   }
//
//   notifyTheOtherClients(): Observable<any> {
//     return this.http.get(NOTIFY_URL);
//   }
// }
