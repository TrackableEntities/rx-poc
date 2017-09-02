import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildDefaultComponent } from './child-default.component';

describe('ChildDefaultComponent', () => {
  let component: ChildDefaultComponent;
  let fixture: ComponentFixture<ChildDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
