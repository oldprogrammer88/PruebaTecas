import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DepositAccountRequest } from 'src/app/interfaces/deposit-account-request';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-deposit-to-account',
  templateUrl: './deposit-to-account.component.html',
  styleUrls: ['./deposit-to-account.component.css']
})
export class DepositToAccountComponent implements OnInit {

  constructor(
    public dialogReg: MatDialogRef<DepositToAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public dataAccount: any,
    private apiService: APIService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.dataAccount.result = false;
  }

  saving = false;

  formDeposit = new FormGroup({
    amount: new FormControl("", [Validators.required, Validators.min(1)])
  });

  getErrorMessage(controlName: string, text: string) {
    const control = this.formDeposit.get(controlName);
    var error: string = "";
    if (control?.hasError("required")) {
      error = `El campo ${text} es requerido`;
    } else if (control?.hasError("min")) {
      error = `El campo ${text} debe tener un valor minimo de ${control.getError("min").min}`
    }

    return error;
  }

  deposit() {
    if (this.formDeposit.valid) {
      this.saving = true;
      this.dataAccount.amount = +(this.formDeposit.get('amount')?.value || 0)
      const depositAccountRequest: DepositAccountRequest = {
        accountNumber: this.dataAccount.accountNumber,
        amount: +(this.formDeposit.get('amount')?.value || 0)
      }
      this.apiService.depositToAccount(depositAccountRequest)
      .pipe(
        catchError(error => {
          this.saving = false
          this.snackBar.open(`Ocurrió un error al tratar de depositar en cuenta ${this.dataAccount.accountNumber}`,"Aceptar", {
            duration: 5000
          });
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
