import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { TodoService, TodoTask } from "../services/todo.service";

@Component({
  selector: 'todo',
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"]
})
export class TodoComponent implements OnInit {
  tasks: Observable<TodoTask[]>;
  constructor(private service: TodoService) {
    this.tasks = service.getTasks();
  }
  ngOnInit(): void {
    this.tasks = this.service.getTasks();
  }
}
