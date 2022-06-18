import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositToAccountComponent } from './deposit-to-account.component';

describe('DepositToAccountComponent', () => {
  let component: DepositToAccountComponent;
  let fixture: ComponentFixture<DepositToAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositToAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositToAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
