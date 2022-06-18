import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { GlobalUser } from '../interfaces/global-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean {
    const token = this.jwtHelper.tokenGetter();

    return !this.jwtHelper.isTokenExpired(token);
  }

  public setCurrentUser(user: GlobalUser)
  {
    localStorage.setItem("user", JSON.stringify(user));
  }

  public getCurrentUser() : GlobalUser {
    return JSON.parse(localStorage.getItem("user") || "{}");
  }

  public getToken() {
    return this.jwtHelper.tokenGetter();
  }

  public setToken(token: string) {
    localStorage.setItem("token", token);
  }

  public removeToken() {
    localStorage.removeItem("token");
  }

  public getGivenName() : string {
    const token = this.jwtHelper.tokenGetter();

    const decodedToken = this.jwtHelper.decodeToken(token);

    return decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"];
  }
}
