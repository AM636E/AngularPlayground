import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { StorageService } from "../services/storage.service";
import { TodoService, TodoTask, Order, ORDER_KEY } from "../services/todo.service";


@Component({
  selector: 'todo',
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"]
})
export class TodoComponent implements OnInit {
  tasks$: Observable<TodoTask[]>;
  order: BehaviorSubject<Order> = new BehaviorSubject<Order>({});

  draggedTask: TodoTask;
  overTask: TodoTask;

  constructor(private service: TodoService, private storageService: StorageService) {
    this.tasks$ = service.getTasks$();
  }

  ngOnInit(): void {
    this.storageService.get<Order>(ORDER_KEY).then(order => {
      this.service.setOrder(order);
    });
  }

  onDragStart(task: TodoTask) {
    this.draggedTask = task;
  }

  onTaskDrop() {
    this.service.switchTasks(this.draggedTask, this.overTask);
  }
}
