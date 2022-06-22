import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { switchMap } from 'rxjs/operators';
import { BalanceService } from '../service/balance.service';
@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.component.html',
  styleUrls: ['./bank-detail.component.css']
})
export class BankDetailComponent implements OnInit {
  bank$: any;
  close = faTimes;

  constructor(private db: AngularFireDatabase, private routekey: ActivatedRoute, private route: Router) { }

  ngOnInit(): any {
    this.bank$ = this.routekey.paramMap.pipe(
      switchMap(params => {
        const key = params.get('key');
        return this.db.list('balance/' + key).valueChanges();
      })
    );
  
    }

    back(){
      this.route.navigateByUrl('/bank');
    }
}
