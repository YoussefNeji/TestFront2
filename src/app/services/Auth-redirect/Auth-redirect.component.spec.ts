import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRedirectComponent } from './Auth-redirect.component';

describe('GoogleRedirectComponent', () => {
  let component: AuthRedirectComponent;
  let fixture: ComponentFixture<AuthRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthRedirectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
