import { Injectable } from "@angular/core";
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';

export interface TodoTask {
  title: string;
};

const DEFAULT_DATA = [
  { title: "test" },
  { title: "test1" },
  { title: "test2" },
];

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  tasksSubject: Subject<TodoTask[]>;

  constructor() {
    this.tasksSubject = new BehaviorSubject(DEFAULT_DATA);
  }

  public getTasks(): Observable<TodoTask[]> {
    return this.tasksSubject.asObservable();
  }
}
