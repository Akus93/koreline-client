import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class EventsService {

  onLoggedIn$: EventEmitter<boolean>;

  constructor() {
    this.onLoggedIn$ = new EventEmitter();
  }

}
