import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { DateService } from '../shared/date.service';
import { TasksService, Task } from '../shared/tasks.service';

@Component({
	selector: 'app-todo',
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

	constructor(
        protected dateService: DateService,
        private formBuilder: FormBuilder,
        private tasksService: TasksService
    ) { }

	form: FormGroup = new FormGroup([]);
    tasks: Task[] = [];

	ngOnInit(): void {
        this.dateService.date.pipe(
            switchMap(value => this.tasksService.load(value))
        ).subscribe(tasks => {
            this.tasks = tasks;
        })

		this.form = this.formBuilder.group({
            title: ['', Validators.required],
        })
	}

    submit() {
        const { title } =  this.form.value;

        const task: Task = {
            title,
            date: this.dateService.date.value.format('DD-MM-YYYY')
        }

        this.tasksService.create(task).subscribe({
            next: task => {
                this.tasks.push(task);
                this.form.reset();
            }, 
            error: err => {
                console.log(err);
            }
        })
    }

    removeTask(task: Task) {
        this.tasksService.remove(task).subscribe({
            next: () => {
                this.tasks = this.tasks.filter(t => t.id !== task.id);
            },
            error: (err) => {
                console.error(err);
            }
        })
    }
}
