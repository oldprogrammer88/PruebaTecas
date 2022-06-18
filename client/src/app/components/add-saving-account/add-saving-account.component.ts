import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { NewSavingAccountRequest } from 'src/app/interfaces/new-saving-account-request';
import { APIService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-saving-account',
  templateUrl: './add-saving-account.component.html',
  styleUrls: ['./add-saving-account.component.css']
})
export class AddSavingAccountComponent implements OnInit {

  constructor(private apiService : APIService, private authService: AuthService, private snackBar: MatSnackBar, private location: Location) { }

  saving = false;
  formAddSavingAccount = new FormGroup({
    accountNumber: new FormControl("", [Validators.required]),
    initialBalance: new FormControl("", Validators.min(0))
  });

  ngOnInit(): void {
  }

  getErrorMessage(controlName: string, text: string) {
    const control = this.formAddSavingAccount.get(controlName);
    var error: string = "";
    if (control?.hasError("required")) {
      error = `El campo ${text} es requerido`;
    } else if (control?.hasError("min")) {
      error = `El campo ${text} debe tener un valor minimo de ${control.getError("min").min}`
    }

    return error;
  }

  addSavingAccount() {
    const newSavingAccountRequest : NewSavingAccountRequest = {
      userEmail: this.authService.getCurrentUser().email,
      accountNumber: +(this.formAddSavingAccount.get('accountNumber')?.value || -1),
      balance: +(this.formAddSavingAccount.get('initialBalance')?.value || -1)
    };

    console.log("request ", newSavingAccountRequest);

    if (this.formAddSavingAccount.valid) {
      this.apiService.addNewSavingAccount(newSavingAccountRequest)
      .pipe(
        retry(3),
        catchError( (error)=>{
          var errorMessage : string;
          console.error(error);
          errorMessage = "Ocurrió un error al tratar de ingresar la nueva cuenta bancaria"
          this.snackBar.open(errorMessage, "Aceptar", {
            duration: 5000
          });
          this.saving = false;
          return throwError(()=>new Error(error));
        })
      ).subscribe((response) => {
        if (response.ok) {
          //Inserción exitosa, redirigir a cuenta bancari
          this.snackBar.open("Se agregó la nueva cuenta bancaria", "Aceptar", {
            duration: 5000
          });
          this.location.back();
          this.saving = false;
        }
      });  
    }
  }

}
