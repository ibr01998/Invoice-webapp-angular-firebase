import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  totalIncome = 0;
  modalToggle = false;
  close = faTimes;

  constructor() { }

  ngOnInit(): void {
  }

}
