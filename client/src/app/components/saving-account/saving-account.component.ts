import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountResponse } from 'src/app/interfaces/account-response';
import { APIService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { DepositToAccountComponent } from '../deposit-to-account/deposit-to-account.component';
import { WithdrawalToAccountComponent } from '../withdrawal-to-account/withdrawal-to-account.component';

@Component({
  selector: 'app-saving-account',
  templateUrl: './saving-account.component.html',
  styleUrls: ['./saving-account.component.css']
})
export class SavingAccountComponent implements OnInit {

  constructor(private apiService: APIService, private authService: AuthService, private dialog: MatDialog) { }

  accounts: AccountResponse[] = [];
  data: any;

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts() {
    const email = this.authService.getCurrentUser().email;
    this.accounts.length = 0;
    this.apiService.getSavingAccounts(email).subscribe(
      response => {
        if (response.ok) {
          if (response.body) {
            this.accounts.push(... response.body);
          }
        }
      }
    );
  }

  deposit(accountNumber: number, index: number) {
    this.data = {};
    this.data.accountNumber = accountNumber;
    const dialogRef = this.dialog.open(DepositToAccountComponent, {
      data: this.data
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log("resultados deposito ", data);
      if (data.result) {
        this.accounts[index].balance += data.amount;
      }
    });
  }

  withdrawal(accountNumber: number, originalAmount: number, index: number) {
    this.data = {};
    this.data.accountNumber = accountNumber;
    this.data.originalAmount = originalAmount;
    const dialogRef = this.dialog.open(WithdrawalToAccountComponent, {
      data: this.data
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log("resultados retiro ", data);
      if (data.result) {
        this.accounts[index].balance -= data.amount;
      }
    });
  }
}
