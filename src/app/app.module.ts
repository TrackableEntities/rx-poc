import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChildDefaultComponent } from './child-default/child-default.component';
import { ChildImmutableComponent } from './child-immutable/child-immutable.component';
import { ChildObservableComponent } from './child-observable/child-observable.component';

@NgModule({
  declarations: [
    AppComponent,
    ChildDefaultComponent,
    ChildImmutableComponent,
    ChildObservableComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
