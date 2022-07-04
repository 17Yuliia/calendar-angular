import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { CalendarComponent } from './organizer/calendar/calendar.component';
import { MomentPipe } from './pipes/moment.pipe';
import { SelectorComponent } from './organizer/selector/selector.component';
import { TodoComponent } from './organizer/todo/todo.component';
import { HttpClientModule } from '@angular/common/http';
import { OrganizerComponent } from './organizer/organizer.component';
import { HomeComponent } from './home/home.component';
import { WeeksOfMonthPipe } from './pipes/weeks-of-month.pipe';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    SelectorComponent,
    TodoComponent,
    MomentPipe,
    OrganizerComponent,
    HomeComponent,
    WeeksOfMonthPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
