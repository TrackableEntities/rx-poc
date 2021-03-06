import { ObservableSet } from '../framework/observable-set';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildObservableComponent } from './child-observable.component';

describe('ChildObservableComponent', () => {
  let component: ChildObservableComponent;
  let fixture: ComponentFixture<ChildObservableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildObservableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildObservableComponent);
    component = fixture.componentInstance;
    component.data = new ObservableSet<string>();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
