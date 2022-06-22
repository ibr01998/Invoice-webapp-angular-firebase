import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Balance } from '../balance';

@Injectable({
  providedIn: 'root'
})

export class BalanceService {

  private dbPath = '/balance';
  
  balanceRef: AngularFireList<Balance>;
  

  constructor(private db: AngularFireDatabase) {
    this.balanceRef = db.list(this.dbPath);
   }

   getAll(): AngularFireList<Balance>{
     return this.balanceRef;
   }

   create(balance: Balance): any {
    return this.balanceRef.push(balance);
  }

  update(key: string, value: any): Promise<void> {
    return this.balanceRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.balanceRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.balanceRef.remove();
  }
}
