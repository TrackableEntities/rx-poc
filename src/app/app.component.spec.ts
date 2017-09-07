import { async, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { ChildDefaultComponent } from './child-default/child-default.component';
import { ChildImmutableComponent } from './child-immutable/child-immutable.component';
import { ChildObservableComponent } from './child-observable/child-observable.component';
import { ObservableSet } from './framework/observable-set';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ChildDefaultComponent,
        ChildImmutableComponent,
        ChildObservableComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    const childDef = TestBed.createComponent(ChildDefaultComponent).componentInstance;
    childDef.data = [];
    const childImmut = TestBed.createComponent(ChildImmutableComponent).componentInstance;
    childImmut.data = [];
    const childDObs = TestBed.createComponent(ChildObservableComponent).componentInstance;
    childDObs.data = new ObservableSet<string>();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
});
