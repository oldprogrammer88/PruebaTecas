import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { BehaviorSubject, NEVER, never, Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators'
import { TransactionHistoryRequest } from '../interfaces/transaction-history-request';
import { TransactionHistoryResponse } from '../interfaces/transaction-history-response';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionDataSourceService implements DataSource<TransactionHistoryResponse> {

  private transactions = new BehaviorSubject<TransactionHistoryResponse[]>([]);
  private totalPages = new BehaviorSubject<number>(1);

  public getTotalPages = this.totalPages.asObservable();

  constructor(private apiService: APIService) { }
  
  connect(collectionViewer: CollectionViewer): Observable<readonly TransactionHistoryResponse[]> {
    return this.transactions.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.transactions.complete();
    this.totalPages.complete();
  }
  loadTransactions(email: string, page: number, size: number) {
    const transactionHistoryRequest : TransactionHistoryRequest = {
      email: email,
      page: page,
      size: size
    };

    this.apiService.getPageTransactionHistory(transactionHistoryRequest)
      .pipe(
        catchError<any, any>(()=>of([])),
        tap(data => this.totalPages.next(data.totalPages))
      )
      .subscribe(data => this.transactions.next(data.transactions));
  }
}
