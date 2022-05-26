import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActiveModulePath } from 'lib-micro-front-end';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    let activeModulePathSpy = jasmine.createSpyObj('ActiveModulePath', ['get'], {})
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [NgbModule, RouterTestingModule ],
      providers: [ { provide: ActiveModulePath, userValue: activeModulePathSpy } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should collapse', () => {
    component.collapse();
    expect(component.isCollapsed).toBeTrue();
  })
  it('should toggle', () => {
    let currentState: boolean = component.isCollapsed;
    component.toggle();
    expect(component.isCollapsed).toBe(!currentState);
  })

  it('should match start of active path ', () => {
    getActiveModulePath(component).get.and.returnValue('retail');
    expect(component.modulePathActiveClass('active','retail')).toBe('active');
  })

  it('should not match start of active path ', () => {
    getActiveModulePath(component).get.and.returnValue('');
    expect(component.modulePathActiveClass('active','retail')).toBe('');
  })
});

function getActiveModulePath(component: any): any {
  return component.activeComponentPath;
}
