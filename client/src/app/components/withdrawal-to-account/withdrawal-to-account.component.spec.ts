import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalToAccountComponent } from './withdrawal-to-account.component';

describe('WithdrawalToAccountComponent', () => {
  let component: WithdrawalToAccountComponent;
  let fixture: ComponentFixture<WithdrawalToAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawalToAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawalToAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
