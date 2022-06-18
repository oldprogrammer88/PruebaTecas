import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WithdrawalAccountRequest } from 'src/app/interfaces/withdrawal-account-request';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-withdrawal-to-account',
  templateUrl: './withdrawal-to-account.component.html',
  styleUrls: ['./withdrawal-to-account.component.css']
})
export class WithdrawalToAccountComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataAccount: any,
    public dialogReg: MatDialogRef<WithdrawalToAccountComponent>,
    private snackBar: MatSnackBar,
    private apiService: APIService
  ) { }

  ngOnInit(): void {
  }

  saving = false;

  formWithdrawal = new FormGroup({
    amount: new FormControl("", [Validators.required, Validators.min(1)])
  });

  getErrorMessage(controlName: string, text: string) {
    const control = this.formWithdrawal.get(controlName);
    var error: string = "";
    if (control?.hasError("required")) {
      error = `El campo ${text} es requerido`;
    } else if (control?.hasError("min")) {
      error = `El campo ${text} debe tener un valor minimo de ${control.getError("min").min}`
    }

    return error;
  }

  withdrawal() {
    if (this.formWithdrawal) {
      const withdrawalAmount = +(this.formWithdrawal.get('amount')?.value || 0);
      if (withdrawalAmount > this.dataAccount.originalAmount) {
        this.snackBar.open("La cantidad no puede superar el monto que tienes ahorrado", "Ok", {
          duration: 5000
        });
      } else {
        this.dataAccount.amount = withdrawalAmount;
        const withdrawlAccountRequest: WithdrawalAccountRequest = {
          accountNumber: this.dataAccount.accountNumber,
          amount: +(this.formWithdrawal.get('amount')?.value || 0)
        };
        this.saving = true;
        this.apiService.withdrawalToAccount(withdrawlAccountRequest)
        .pipe(
          catchError(error => {
            this.saving = false
            if (error.errors) {
              this.snackBar.open(`${error.errors[0]}`,"Aceptar", {
                duration: 5000
              });
            } else {
              this.snackBar.open(`Ocurrió un error al tratar de depositar en cuenta ${this.dataAccount.accountNumber}`,"Aceptar", {
                duration: 5000
              });
            }
            console.error("error al tratar de depositar ", error);
            return throwError( () => new Error(error));
          })
        )
        .subscribe(response => {
          if (response.ok) {
            this.snackBar.open("Se depositó correctamente","Aceptar", {
              duration: 5000
            });
            this.dataAccount.result = true;
            this.dialogReg.close(this.dataAccount);
          }
          this.saving = false;
        });
      }
    }
  }
}
