import { Component, ElementRef, Input, Output, ViewChild, EventEmitter } from "@angular/core";
import { TodoTask } from "../services/todo.service";

@Component({
  selector: 'todo-task',
  templateUrl: "./task.component.html",
  styleUrls: ["./todo.component.css"]
})
export class TodoTaskComponent {

  @Input() public task: TodoTask;

  @Output() dragStart: EventEmitter<TodoTask> = new EventEmitter<TodoTask>();
  @Output() dragOver: EventEmitter<TodoTask> = new EventEmitter<TodoTask>();
  @Output() drop: EventEmitter<TodoTask> = new EventEmitter<TodoTask>();;

  over: boolean = false;

  @ViewChild("taskNode")
  taskNode: ElementRef<HTMLDivElement>;

  onDragStart(event: Event) {
    this.taskNode.nativeElement.style.opacity = "0.4";
    this.dragStart.emit(this.task);
  }

  onDragEnd(event: Event) {
    this.taskNode.nativeElement.style.opacity = "1";
    this.over = false;
  }

  onDragEnter(event: Event) {
    this.dragOver.emit(this.task);
    this.over = true;
  }

  onDrop(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.drop.emit(this.task);
  }
}
