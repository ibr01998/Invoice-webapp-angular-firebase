import { Component, OnInit, Output, EventEmitter, ElementRef} from '@angular/core';
import { faSignOutAlt, faUniversity, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faReceipt } from '@fortawesome/free-solid-svg-icons'
import { FirebaseServiceService } from 'src/app/core/firebase-service.service';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  bank = faUniversity;
  income = faHandHoldingUsd;
  profile = faUserCircle;
  expense = faReceipt;
  logoutbtn = faSignOutAlt;
  clients = faUsers;

  @Output() isLogout = new EventEmitter<void>()

  constructor(public firebaseService: FirebaseServiceService, private data: DataService) { }

  ngOnInit(): void {
  }

  logout(){
    this.firebaseService.logout()
    this.data.changeStatus(false);
  }

}
