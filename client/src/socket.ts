import { io } from 'socket.io-client';
const SERVERENDPOINT = "http://localhost:8080";
export const socket = io(SERVERENDPOINT);