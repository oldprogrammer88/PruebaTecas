import { TestBed } from '@angular/core/testing';

import { TransactionDataSourceService } from './transaction-data-source.service';

describe('TransactionDataSourceService', () => {
  let service: TransactionDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
