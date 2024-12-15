import { io, Socket } from 'socket.io-client';
import { Event, EventStats } from '../types/event';

class WebSocketService {
  private socket: Socket;
  private eventHandlers: Map<string, Function[]> = new Map();

  constructor() {
    this.socket = io(import.meta.env.VITE_WS_URL || 'http://localhost:3000');
    this.setupListeners();
  }

  private setupListeners() {
    this.socket.on('eventUpdate', (event: Event) => {
      this.emit('eventUpdate', event);
    });

    this.socket.on('statsUpdate', (stats: EventStats) => {
      this.emit('statsUpdate', stats);
    });
  }

  public subscribe(event: string, callback: Function) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event)?.push(callback);
  }

  private emit(event: string, data: any) {
    this.eventHandlers.get(event)?.forEach(callback => callback(data));
  }
}

export const wsService = new WebSocketService();