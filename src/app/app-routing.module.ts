import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BankDetailComponent } from './bank-detail/bank-detail.component';
import { BankComponent } from './bank/bank.component';
import { ClientsComponent } from './clients/clients.component';
import { ErrorComponent } from './error/error.component';
import { IncomeComponent } from './income/income.component';

const routes: Routes = [
  {path: 'bank', component: BankComponent, canActivate: [AuthGuard], children:[
    {path: ':key', component: BankDetailComponent}
  ] },
  {path: 'clients', component: ClientsComponent},
  {path: 'income', component: IncomeComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
