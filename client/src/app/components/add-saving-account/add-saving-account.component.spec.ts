import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSavingAccountComponent } from './add-saving-account.component';

describe('AddSavingAccountComponent', () => {
  let component: AddSavingAccountComponent;
  let fixture: ComponentFixture<AddSavingAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSavingAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSavingAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
