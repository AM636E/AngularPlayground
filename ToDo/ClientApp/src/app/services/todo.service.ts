import { Injectable } from "@angular/core";
import { BehaviorSubject, of, Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface TodoTask {
  title: string;
};

export type Order = { [key: string]: number };

const DEFAULT_DATA = [
  { title: "test" },
  { title: "test1" },
  { title: "test2" },
  { title: "test3" },
  { title: "test4" },
  { title: "test5" },
  { title: "test6" },
  { title: "test7" },
  { title: "test8" },
];

const DEFAULT_ORDER: Order = DEFAULT_DATA.reduce(
  (acc, item, i) => ({ ...acc, [item.title]: i }),
  {}
);

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  tasksSubject: Subject<TodoTask[]>;
  orderSubject: Subject<Order> = new BehaviorSubject<Order>(DEFAULT_ORDER);
  currentTasks: TodoTask[] = [];
  currentOrder: Order = DEFAULT_ORDER;

  public tasks$: Observable<TodoTask[]>;

  constructor() {
    this.tasksSubject = new BehaviorSubject(DEFAULT_DATA);

    this.tasks$ = this.tasksSubject.pipe(
      switchMap(tasks => this.orderSubject.pipe(
        switchMap(order => {
          const sorted = tasks.sort((task1, task2) => {
            if (order[task1.title] > order[task2.title]) {
              return 1;
            } else if (order[task1.title] < order[task2.title]) {
              return -1;
            }
            return 0;
          });

          return of(sorted);
        })
      ))
    );

    this.tasks$.subscribe(tasks => this.currentTasks = tasks);
    this.orderSubject.subscribe(order => this.currentOrder = order);
  }

  public setOrder(order: Order) {
    this.orderSubject.next(order);
  }

  public setTaskAfter(first: TodoTask, second: TodoTask) {
    const index1 = this.currentTasks.findIndex(task => task.title === first.title);
    const index2 = this.currentTasks.findIndex(task => task.title === second.title);
    const newOrder = {
      ...this.currentOrder,
      [first.title]: index2,
      [second.title]: index1
    };

    this.orderSubject.next(newOrder);
  }
}
