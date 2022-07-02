import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { DateService } from '../../shared/date.service';

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {

	constructor(protected dateService: DateService) { }

    date$: BehaviorSubject<moment.Moment> = new BehaviorSubject<moment.Moment>(moment());

	ngOnInit(): void {	
        this.date$ = this.dateService.date;
    }    

    selectDay(day: moment.Moment) {
        this.dateService.changeDate(day);
    }
}
