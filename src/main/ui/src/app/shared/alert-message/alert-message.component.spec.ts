import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AlertMessageComponent, AlertType} from './alert-message.component';

describe('AlertMessageComponent', () => {
  let component: AlertMessageComponent;
  let fixture: ComponentFixture<AlertMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays Success message', () => {
    component.message = 'Success';
    component.alertType = AlertType.Success;

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.alert-success')[0].textContent.trim()).toBe('Success');
  });

  it('displays error message in error', () => {
    component.message = 'Failed';
    component.alertType = AlertType.Failed;

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.alert-danger')[0].textContent.trim()).toBe('Failed');
  });
});
