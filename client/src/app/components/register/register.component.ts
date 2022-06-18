import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserRegisterRequest } from 'src/app/interfaces/user-register-request';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private apiService: APIService, private snackBar : MatSnackBar, private router : Router) { }

  saving = false

  formLogin = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    name: new FormControl("", Validators.required),
    lastname: new FormControl("", Validators.required),
    secondLastname: new FormControl(""),
    identificationNumber: new FormControl("", [Validators.required]),
    password: new FormControl("", Validators.required)
  });

  ngOnInit(): void {
  }

  getErrorMessage(controlName: string, texto: string) {
    const control = this.formLogin.get(controlName)
    var error: string = "";
    if (control?.hasError("required")) {
      error = `El campo ${texto} es requerido`
    } else if (control?.hasError("pattern")) {
      error = `El campo ${texto} solo debe ser numeros`
    } else if (control?.hasError("email")) {
      error = `El campo ${texto} debe tener un formato correcto`;
    }

    return error;
  }

  register() {
    if (this.formLogin.valid) {
      this.saving = true;
      const newUserRegister : UserRegisterRequest = {
        email: this.formLogin.get('email')?.value || '',
        name: this.formLogin.get('name')?.value || '',
        lastname: this.formLogin.get('lastname')?.value || '',
        secondLastname: this.formLogin.get('secondLastname')?.value || '',
        identificationNumber: +(this.formLogin.get('identificationNumber')?.value || -1),
        password: this.formLogin.get('password')?.value || ''
      };

      console.log(newUserRegister);
      
      this.apiService.saveNewUser(newUserRegister)
        .pipe(
          retry(3),
          catchError( (error)=>{
            var errorMessage : string;
            if (error.errors) {
              let errorCode = error.errors[0].errorCode;
              switch(errorCode) {
                case "DuplicateUserName":
                  errorMessage = "Numero de identificación duplicado";
                  break;
                default:
                  errorMessage = "Ha ocurrido un error al tratar de registrar el usuario";
                  break;
              }
            } else {
              errorMessage = "Ha ocurrido un error al tratar de registrar el usuario";
            }
            this.snackBar.open(errorMessage, "Aceptar", {
              duration: 5000
            });
            this.saving = false;
            return throwError(()=>new Error(error));
          })
        ).subscribe((response) => {
          if (response.ok) {
            //Inserción exitosa, redirigir a home
            this.snackBar.open("Usuario registrado exitosamente", "Aceptar", {
              duration: 5000
            });
            this.router.navigateByUrl("dashboard/saving-account");
          }
        });      
    }
  }

}
