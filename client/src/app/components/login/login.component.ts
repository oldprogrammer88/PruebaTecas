import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserLoginRequest } from 'src/app/interfaces/user-login-request';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apiService: APIService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  saving = false;

  formLogin = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  });

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

  login() {
    if (this.formLogin.valid) {
      const userLoginRequest : UserLoginRequest = {
        email: this.formLogin.get('email')?.value || '',
        password: this.formLogin.get('password')?.value || ''
      };

      this.apiService.login(userLoginRequest)
        .pipe(
          retry(3),
          catchError( (error)=>{
            var errorMessage : string;
            errorMessage = "Ha ocurrido un error al tratar de hacer login";
            this.snackBar.open(errorMessage, "Aceptar", {
              duration: 5000
            });
            this.saving = false;
            return throwError(()=>new Error(error));
          })
        ).subscribe((response) => {
          if (response.ok) {
            //Inserción exitosa, redirigir a home
            this.snackBar.open("Usuario logueado exitosamente", "Aceptar", {
              duration: 5000
            });
            this.router.navigateByUrl("dashboard/saving-account");
          }
        });
    }
  }
}
