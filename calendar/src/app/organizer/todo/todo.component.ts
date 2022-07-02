import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { DateService } from '../../shared/date.service';
import { TasksService, Task } from '../../shared/tasks.service';

@Component({
	selector: 'app-todo',
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit, OnDestroy {

	constructor(
        protected tasksService: TasksService,
        protected dateService: DateService,
        private formBuilder: FormBuilder
    ) { }

	form: FormGroup = new FormGroup([]);
    tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
    date$: BehaviorSubject<moment.Moment> = new BehaviorSubject<moment.Moment>(moment());

	ngOnInit(): void {        
        this.date$ = this.dateService.date;
        this.date$.subscribe(observer => {
            this.tasksService.load(observer);
        })

        this.tasks$ = this.tasksService.tasks;

        this.form = this.formBuilder.group({
            title: ['', Validators.required],
        })
	}

    ngOnDestroy(): void {
        this.date$.unsubscribe();
    }

    submit() {
        const { title } =  this.form.value;

        const task: Task = {
            title,
            date: this.dateService.date.value.format('DD-MM-YYYY')
        }

        this.tasksService.create(task);

        this.form.reset();
    }

    removeTask(task: Task) {
        this.tasksService.remove(task);
    }
}
