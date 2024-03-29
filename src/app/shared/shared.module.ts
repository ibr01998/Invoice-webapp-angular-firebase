import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    SidebarComponent,
  ],
  exports: [
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AppRoutingModule,
  ]
})
export class SharedModule { }
