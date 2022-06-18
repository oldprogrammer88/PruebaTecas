import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { AuthGuardService } from 'src/app/guards/auth-guard-service.service';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { SavingAccountComponent } from 'src/app/components/saving-account/saving-account.component';
import { TransactionHistoryComponent } from 'src/app/components/transaction-history/transaction-history.component';
import { AuthChildGuard } from 'src/app/guards/auth-child.guard';
import { MaterialModule } from '../material/material.module';
import { AddSavingAccountComponent } from 'src/app/components/add-saving-account/add-saving-account.component';
import { LoginComponent } from 'src/app/components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService], canActivateChild: [AuthChildGuard],
    children: [
      { path: 'saving-account', component: SavingAccountComponent },
      { path: 'transaction-history', component: TransactionHistoryComponent },
      { path: 'add-saving-account', component: AddSavingAccountComponent }
    ] 
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  declarations: [
    SavingAccountComponent,
    TransactionHistoryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
