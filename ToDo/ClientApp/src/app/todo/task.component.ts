import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { TodoTask } from "../services/todo.service";

@Component({
  selector: 'todo-task',
  templateUrl: "./task.component.html",
  styleUrls: ["./todo.component.css"]
})
export class TodoTaskComponent {

  @Input() public task: TodoTask;

  over: boolean = false;

  @ViewChild("taskNode")
  taskNode: ElementRef<HTMLDivElement>;

  onDragStart(event: Event) {
    this.taskNode.nativeElement.style.opacity = "0.4";
  }

  onDragEnd(event: Event) {
    this.taskNode.nativeElement.style.opacity = "1";
    this.over = false;
  }

  onDragEnter(event: Event) {
    this.over = true;
  }

  onDrop(event: Event) {
    console.log("drop", event);
  }
}
