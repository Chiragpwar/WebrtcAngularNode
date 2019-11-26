import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
  private messageSource = new BehaviorSubject('');
  currentIds = this.messageSource.asObservable();

  constructor() {
  }

  getIds(id: any) {
    this.messageSource.next(id);
  }

}

