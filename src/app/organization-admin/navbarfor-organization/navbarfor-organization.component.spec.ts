import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarforOrganizationComponent } from './navbarfor-organization.component';

describe('NavbarforOrganizationComponent', () => {
  let component: NavbarforOrganizationComponent;
  let fixture: ComponentFixture<NavbarforOrganizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarforOrganizationComponent]
    });
    fixture = TestBed.createComponent(NavbarforOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
