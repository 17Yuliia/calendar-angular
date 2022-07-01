import { keyframes } from "@angular/animations";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as moment from "moment";
import { map, Observable } from "rxjs";

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
    static url = 'https://calculator-angular-practice-default-rtdb.firebaseio.com/tasks';

    headers = new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
    })
    
    constructor(private http: HttpClient) {

    }

    load(date: moment.Moment):Observable<Task[]> {
        return this.http.get<Task[]>(`${TasksService.url}/${date.format('DD-MM-YYYY')}.json`)
        .pipe(map(tasks => {
            if (!tasks) {
                console.log('return')
                return []
            }
            console.log(tasks)

            return Object.keys(tasks).map((key: any) => ({...tasks[key], id: key}))
        }))
    }

    create(task: Task): Observable<Task> {
        return this.http.post<Response>(`${TasksService.url}/${task.date}.json`, task)
        .pipe(map(res => {
            console.log(res)
            return {...task, id: res.name};
        }))
    }

    remove(task: Task):Observable<void> {
        return this.http.delete<void>(`${TasksService.url}/${task.date}/${task.id}.json`)
    }
}