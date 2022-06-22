import { Component, OnInit } from '@angular/core';
import { faTimes, faTrash} from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs/operators';
import { Balance } from '../balance';
import { BalanceService } from '../service/balance.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  delete = faTrash;
  modalToggle = false;
  close = faTimes;
  totalBalance!: number;
  gets$: any;

  balance: Balance = new Balance();
  submitted = false;

  constructor(private balanceService: BalanceService) { }

  ngOnInit(): void {
  this.gets$ = this.balanceService.getAll().snapshotChanges().pipe(
    map(object => {
      return object.map(a => {
        const key = a.payload.key;
        const data = a.payload.val();
        return {key, ...data}
      })
    })
  );

  this.gets$.forEach((element: any) => {
    this.totalBalance = 0;
      for (let i = 0; i < element.length; i++) {
        this.totalBalance += element[i].amount
      }
  });
  } 
  

  saveBalance(): void{
    console.log(this.balance);
    this.balanceService.create(this.balance).then(() => {
      console.log('succefully updated balance')
      this.submitted = true;
    })
    this.modalToggle = false;
  }

  deleteItem(key: any): void{
    this.balanceService.delete(key);
  }

}
