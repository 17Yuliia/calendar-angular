import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

interface Day {
	value: moment.Moment,
	active: boolean,
	disabled: boolean,
	selected: boolean,
}

interface Week {
	days: Day[],
}

@Pipe({
	name: 'weeksOfMonth',
	pure: false
})
export class WeeksOfMonthPipe implements PipeTransform {

	transform(value: moment.Moment): Week[] {
		return this.generate(value);
	}

	generate(now: moment.Moment): Week[] {
		const startDay = now.clone().startOf('month').startOf('week');
		const endDay = now.clone().endOf('month').endOf('week');

		const date = startDay.clone().subtract(1, 'day');

		const calendar = [];

		while (date.isBefore(endDay, 'day')) {
				calendar.push({
						days: Array(7)
						.fill(0)
						.map(() => {
								const value = date.add(1, 'day').clone();
								const active = moment().isSame(value, 'date');
								const disabled = !now.isSame(value, 'month');
								const selected = now.isSame(value, 'date');

								return {
										value,
										active,
										disabled,
										selected,
								}
						})
				})

		}

		return calendar;
	}
}
