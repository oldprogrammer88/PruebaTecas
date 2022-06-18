import { HttpClient, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AccountResponse } from '../interfaces/account-response';
import { DepositAccountRequest } from '../interfaces/deposit-account-request';
import { NewSavingAccountRequest } from '../interfaces/new-saving-account-request';
import { TransactionHistoryRequest } from '../interfaces/transaction-history-request';
import { TransactionHistoryResponse } from '../interfaces/transaction-history-response';
import { UserLoginRequest } from '../interfaces/user-login-request';
import { UserLoginResponse } from '../interfaces/user-login-response';
import { UserRegisterRequest } from '../interfaces/user-register-request';
import { UserRegisterResponse } from '../interfaces/user-register-response';
import { WithdrawalAccountRequest } from '../interfaces/withdrawal-account-request';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private httpClient : HttpClient, private authService: AuthService) { }

  mainEndPoint = "http://localhost:48593/api";
  loginEndPoint = "/login";

  saveNewUser(newUserRegister: UserRegisterRequest) : Observable<HttpResponse<UserRegisterResponse>> {
    const urlRegister = `${this.mainEndPoint}${this.loginEndPoint}/registerUser`;
    return this.httpClient.post<UserRegisterResponse>(urlRegister, newUserRegister, {
      observe: 'response'
    }).pipe(
      tap(
        response => {
          if (response.ok) {
            this.authService.setCurrentUser({
              email: newUserRegister.email
            });
            if (response.body?.token) {
              this.authService.setToken(response.body?.token);
            }
          }
        }
      )
    );
  }

  login(userLoginRequest: UserLoginRequest) : Observable<HttpResponse<UserLoginResponse>> {
    const urlLogin = `${this.mainEndPoint}${this.loginEndPoint}/loginUser`;
    return this.httpClient.post<UserLoginResponse>(urlLogin, userLoginRequest, {
      observe: 'response'
    }).pipe(
      tap( response => {
        if (response.ok) {
          this.authService.setCurrentUser({
            email: userLoginRequest.email
          });
          if (response.body?.token) {
            this.authService.setToken(response.body?.token);
          }
        }
      })
    );
  }

  savingAcountEndPoint = "/SavingAccount";

  addNewSavingAccount(newSavingAccountRequest: NewSavingAccountRequest) : Observable<HttpResponse<any>> {
    const urlNewSavingAccount = `${this.mainEndPoint}${this.savingAcountEndPoint}/addNewSavingAccount`;
    return this.httpClient.post(urlNewSavingAccount, newSavingAccountRequest, {
      observe: 'response'
    });
  }

  getSavingAccounts(userEmail: string) : Observable<HttpResponse<AccountResponse[]>> {
    const urlGetSavingAccounts = `${this.mainEndPoint}${this.savingAcountEndPoint}/getAccountsByEmail?userEmail=${userEmail}`;
    return this.httpClient.get<AccountResponse[]>(urlGetSavingAccounts, {
      observe: 'response'
    });
  }

  depositToAccount(depositAccountRequest: DepositAccountRequest) : Observable<HttpResponse<any>> {
    const urlDepositToAccount = `${this.mainEndPoint}${this.savingAcountEndPoint}/depositToAccount`;
    return this.httpClient.put<any>(urlDepositToAccount, depositAccountRequest, {
      observe: 'response'
    });
  }

  withdrawalToAccount(withdrawalAccountRequest: WithdrawalAccountRequest) : Observable<HttpResponse<any>> {
    const urlWithdrawalToAccount = `${this.mainEndPoint}${this.savingAcountEndPoint}/withdrawalToAccount`;
    return this.httpClient.put<any>(urlWithdrawalToAccount, withdrawalAccountRequest, {
      observe: 'response'
    });
  }

  transactionHistoryEndPoint = "/TransactionHistory";

  getPageTransactionHistory(transactionHistoryRequest: TransactionHistoryRequest) : Observable<TransactionHistoryResponse> {
    const urlPageTransactionHistory = `${this.mainEndPoint}${this.transactionHistoryEndPoint}/pageTransactionByUserEmail`;
    return this.httpClient.post<TransactionHistoryResponse>(urlPageTransactionHistory, transactionHistoryRequest);
  }
}
