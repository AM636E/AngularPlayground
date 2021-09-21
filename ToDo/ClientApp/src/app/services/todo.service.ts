import { Injectable } from "@angular/core";
import { BehaviorSubject, of, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StorageService } from "./storage.service";

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

export const ORDER_KEY = "order";

const taskOrderer = (order: Order) => (task1: TodoTask, task2: TodoTask) => {
  if (order[task1.title] > order[task2.title]) {
    return 1;
  } else if (order[task1.title] < order[task2.title]) {
    return -1;
  }
  return 0;
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  tasksSubject: BehaviorSubject<TodoTask[]>;
  orderSubject: BehaviorSubject<Order> = new BehaviorSubject<Order>(DEFAULT_ORDER);
  
  private tasks$: Observable<TodoTask[]>;

  constructor(private storageService: StorageService) {
    this.tasksSubject = new BehaviorSubject(DEFAULT_DATA);

    this.tasks$ = this.tasksSubject.pipe(
      switchMap(tasks => this.orderSubject.pipe(
        switchMap(order => of(tasks.sort(taskOrderer(order))))
      ))
    );
  }

  public getTasks$() {
    return this.tasks$;
  }

  public setOrder(order: Order) {
    this.orderSubject.next(order);
  }

  public saveCurrentOrder() {
    return 
  }

  public switchTasks(first: TodoTask, second: TodoTask) {
    const index1 = this.tasksSubject.value.findIndex(task => task.title === first.title);
    const index2 = this.tasksSubject.value.findIndex(task => task.title === second.title);
    const newOrder = {
      ...this.orderSubject.value,
      [first.title]: index2,
      [second.title]: index1
    };
    this.storageService.save(ORDER_KEY, newOrder);

    this.orderSubject.next(newOrder);
  }
}
