import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private status = new BehaviorSubject<boolean>(false); 

  currentStatus = this.status.asObservable();

  constructor() { }

  changeStatus(status: boolean){
    this.status.next(status);
  }
}
