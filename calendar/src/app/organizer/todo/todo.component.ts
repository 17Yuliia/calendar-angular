import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService, Task } from '../../shared/tasks.service';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

@Component({
	selector: 'app-todo',
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {

	constructor(
        protected tasksService: TasksService,
        private formBuilder: FormBuilder,
    ) { }

	form: FormGroup = new FormGroup([]);
    tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

    @Input()
    date$: BehaviorSubject<moment.Moment> = new BehaviorSubject<moment.Moment>(moment());
    
	ngOnInit(): void {  
        this.date$.subscribe(observer => {
            this.tasksService.load(observer);
        })

        this.tasks$ = this.tasksService.tasks;

        this.form = this.formBuilder.group({
            title: ['', Validators.required],
        })
	}

    submit() {
        const { title } =  this.form.value;

        const task: Task = {
            title,
            date: this.date$.value.format('DD-MM-YYYY')
        }

        this.tasksService.create(task);

        this.form.reset();
    }

    removeTask(task: Task) {
        this.tasksService.remove(task);
    }
}
