import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

@Component({
	selector: 'app-selector',
	templateUrl: './selector.component.html',
	styleUrls: ['./selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorComponent {

	constructor() { }

	@Input()
    date$: BehaviorSubject<moment.Moment> = new BehaviorSubject<moment.Moment>(moment());

	@Output()
	changeMonthEvent: EventEmitter<number> = new EventEmitter<number>();

	go(dir: number) {
		return this.changeMonthEvent.emit(dir);
	}
}