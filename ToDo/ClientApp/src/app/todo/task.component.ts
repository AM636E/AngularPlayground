import { Component, ElementRef, Input, Output, ViewChild, EventEmitter, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TodoTask } from "../services/todo.service";

@Component({
  selector: 'todo-task',
  templateUrl: "./task.component.html",
  styleUrls: ["./todo.component.css"]
})
export class TodoTaskComponent implements OnInit {
  @ViewChild("taskNode")
  taskNode: ElementRef<HTMLDivElement>;

  @Input() public task: TodoTask;

  @Output() dragStart: EventEmitter<TodoTask> = new EventEmitter<TodoTask>();
  @Output() dragOver: EventEmitter<TodoTask> = new EventEmitter<TodoTask>();
  @Output() drop: EventEmitter<TodoTask> = new EventEmitter<TodoTask>();;

  dragCounter: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  over: boolean = false;
  
  ngOnInit(): void {
    this.dragCounter.subscribe(value => {
      this.over = value > 0;
    });
  }

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
    this.dragCounter.next(this.dragCounter.value + 1);
  }

  onDragLeave(event: Event) {
    this.dragCounter.next(this.dragCounter.value - 1);
  }

  onDrop(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.drop.emit(this.task);
  }
}
