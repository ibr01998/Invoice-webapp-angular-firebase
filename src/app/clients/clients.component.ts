import { Component, OnInit } from '@angular/core';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Client } from '../client';
import { ClientsService } from '../service/clients.service';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  close = faTimes;
  modalToggle = false;
  delete = faTrash;
  gets$: any;
  totalClients!: number;
  client: Client = new Client();

  userid = "";

  constructor(private clientService: ClientsService, private afAuth: AngularFireAuth) {
    this.afAuth.onAuthStateChanged((user) =>{
      if(user){
        console.log(user.uid);
      }
    })
   }

  ngOnInit(): void {
    this.gets$ = this.clientService.getAll().snapshotChanges().pipe(
      map(object => {
        return object.map(a => {
          const key = a.payload.key;
          const data = a.payload.val();
          return {key, ...data}
        })
      })
    );

    this.gets$.forEach((element: any) => {
      this.totalClients = element.length;
    });
    
  }

  addClient(){
    console.log(this.client);
    this.clientService.create(this.client).then(() => {
      console.log('succefully added Client')
    })
    this.modalToggle = false;
  }

  deleteItem(key: any): void{
    this.clientService.delete(key);
  }

  holdHandler(e: any, key: any){
    console.log(e)
    if(e >= 1000){
      this.clientService.delete(key);
    }
  }

}
