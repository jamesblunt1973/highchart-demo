import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';
import { HttpClientModule } from '@angular/common/http';
import { ClockComponent } from './clock/clock.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    ClockComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  //constructor() {
  //  Math.easeOutBounce = function (pos) {
  //    if ((pos) < (1 / 2.75)) {
  //      return (7.5625 * pos * pos);
  //    }
  //    if (pos < (2 / 2.75)) {
  //      return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
  //    }
  //    if (pos < (2.5 / 2.75)) {
  //      return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
  //    }
  //    return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
  //  };
  //}
}
