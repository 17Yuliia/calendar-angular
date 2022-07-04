import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { DateService } from '../shared/date.service';

@Component({
	selector: 'app-organizer',
	templateUrl: './organizer.component.html',
	styleUrls: ['./organizer.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizerComponent implements OnInit {
	
	constructor(
		private dateService: DateService,
		private route: ActivatedRoute,
		private router: Router
	) { }
	
	date$: BehaviorSubject<moment.Moment> = new BehaviorSubject<moment.Moment>(moment());

	ngOnInit(): void {
		this.date$ = this.dateService.date;

		this.getDateFromUrl();

		this.date$.subscribe(date => {
			this.router.navigate([`/organizer/${date.format('DD-MM-YYYY')}`]);
		})
	}

	getDateFromUrl(): void {
		this.route.paramMap.subscribe(params => {
			const date = params.get('date');
			date && this.date$.next(moment(date, 'DD-MM-YYYY'));
		});
	}

	changeMonth(dir: number): void {
		this.dateService.changeMonth(dir);
	}

	changeDate(date: moment.Moment): void {
		this.dateService.changeDate(date);
	}
}
