import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';
import { APIService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { TransactionDataSourceService } from 'src/app/services/transaction-data-source.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ["date","typeTransaction","amount","accountNumber"];
  dataSource: TransactionDataSourceService;
  email: string = "";
  size = 5;
  page = 0;
  totalPages = 0;

  constructor(private apiService: APIService, private authService: AuthService) {
    this.dataSource = new TransactionDataSourceService(this.apiService);
    this.dataSource.getTotalPages.subscribe(totalPages => {
      this.totalPages=totalPages;
    });
  }

  ngOnInit(): void {
    this.email = this.authService.getCurrentUser().email;
    this.dataSource.loadTransactions(this.email, this.page, this.size);
  }

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        tap(() => this.loadMoreData())
      )
      .subscribe()
  }

  loadMoreData() {
    this.dataSource.loadTransactions(
      this.email,
      this.paginator.pageIndex,
      this.paginator.pageSize
    )
  }
}
