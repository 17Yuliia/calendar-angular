import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

@Component({
	selector: 'organizer-calendar',
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
        if (day.format('DD-MM-YYYY') === this.date$.value.format('DD-MM-YYYY')) {
            return;
        }

        return this.changeDateEvent.emit(day);
    }
}
