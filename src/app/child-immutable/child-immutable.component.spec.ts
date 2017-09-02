import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildImmutableComponent } from './child-immutable.component';

describe('ChildImmutableComponent', () => {
  let component: ChildImmutableComponent;
  let fixture: ComponentFixture<ChildImmutableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildImmutableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildImmutableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
