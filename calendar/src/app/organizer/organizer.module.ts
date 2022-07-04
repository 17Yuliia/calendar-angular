import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizerRoutingModule } from './organizer-routing.module';

import { OrganizerComponent } from './organizer.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SelectorComponent } from './selector/selector.component';
import { TodoComponent } from './todo/todo.component';

import { MomentPipe } from './pipes/moment.pipe';
import { WeeksOfMonthPipe } from './pipes/weeks-of-month.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TodoComponent,
    CalendarComponent,
    SelectorComponent,
    OrganizerComponent,
    MomentPipe,
    WeeksOfMonthPipe,
  ],
  imports: [
    CommonModule,
    OrganizerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class OrganizerModule { }