import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KiunziMicroFrontendComponent } from './kiunzi-micro-frontend.component';

describe('KiunziMicroFrontendComponent', () => {
  let component: KiunziMicroFrontendComponent;
  let fixture: ComponentFixture<KiunziMicroFrontendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KiunziMicroFrontendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KiunziMicroFrontendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
