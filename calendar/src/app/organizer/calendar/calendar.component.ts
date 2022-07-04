import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent {

	constructor( ) { }

    @Input()
    date$: BehaviorSubject<moment.Moment> = new BehaviorSubject<moment.Moment>(moment());

    @Output()
    changeDateEvent: EventEmitter<moment.Moment> = new EventEmitter<moment.Moment>();

    selectDay(day: moment.Moment) {
        return this.changeDateEvent.emit(day);
    }
}
