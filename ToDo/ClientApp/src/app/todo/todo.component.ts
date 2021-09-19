import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { TodoService, TodoTask, Order } from "../services/todo.service";


@Component({
  selector: 'todo',
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"]
})
export class TodoComponent implements OnInit {
  tasks: Observable<TodoTask[]>;
  order: BehaviorSubject<Order> = new BehaviorSubject<Order>({});

  draggedTask: TodoTask;
  overTask: TodoTask;

  constructor(private service: TodoService) {
    this.tasks = service.tasks$;
  }

  ngOnInit(): void {
    this.tasks = this.service.tasks$;
  }

  onDragStart(task: TodoTask) {
    this.draggedTask = task;
  }

  onDragOver(task: TodoTask) {
  }

  onTaskDrop() {
    this.service.setTaskAfter(this.draggedTask, this.overTask);
  }
}
