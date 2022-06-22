import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Client } from '../client';


@Injectable({
  providedIn: 'root'
})

export class ClientsService{

  userId!: string;  
  clientRef!: AngularFireList<Client>;
  

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid      
    })
    this.clientRef = this.db.list(`clients/${this.userId}`);
   }

   getAll(): AngularFireList<Client>{
     return this.clientRef;
   }

   create(client: Client): any {
    return this.clientRef.push(client);
  }

  update(key: string, value: any): Promise<void> {
    return this.clientRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.clientRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.clientRef.remove();
  }
}
