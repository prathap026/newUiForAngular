import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedisComponent } from './redis.component';

describe('RedisComponent', () => {
  let component: RedisComponent;
  let fixture: ComponentFixture<RedisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RedisComponent]
    });
    fixture = TestBed.createComponent(RedisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
