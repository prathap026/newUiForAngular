import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedCompanyComponent } from './deleted-company.component';

describe('DeletedCompanyComponent', () => {
  let component: DeletedCompanyComponent;
  let fixture: ComponentFixture<DeletedCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletedCompanyComponent]
    });
    fixture = TestBed.createComponent(DeletedCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
