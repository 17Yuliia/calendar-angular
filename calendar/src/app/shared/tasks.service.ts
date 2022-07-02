import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as moment from "moment";
import { BehaviorSubject, map, Observable } from "rxjs";

export interface Task {
    id?: string,
    title: string,
    date: string,
}

interface Response {
    name: string,
}

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    url = 'https://calculator-angular-practice-default-rtdb.firebaseio.com/tasks';

    public tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
    
    constructor(private http: HttpClient) { }

    load(date: moment.Moment) {
        this.http.get<Task[]>(`${this.url}/${date.format('DD-MM-YYYY')}.json`)
            .pipe(map(res => {
                if (!res) {
                    return [];
                }
                
                return (Object.keys(res).map((key: any) => ({...res[key], id: key})))
            }))
            .subscribe(tasks => {
                this.tasks.next(tasks);
            })
    }

    create(task: Task) {
        this.http.post<Response>(`${this.url}/${task.date}.json`, task)
        .pipe(map(res => ({...task, id: res.name})))
        .subscribe({
            next: task => {
                this.tasks.value.push(task);
                this.tasks.next(this.tasks.value);
            },
            error: err => console.error(err)
        })
    }

    remove(task: Task) {
        this.http.delete<void>(`${this.url}/${task.date}/${task.id}.json`)
        .subscribe({
            next: () => {
                const filtered = this.tasks.value.filter(t => t.id !== task.id);
                this.tasks.next(filtered);
            },
            error: err => console.error(err)
        })
    }
}