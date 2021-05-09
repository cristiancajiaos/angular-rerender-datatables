import { Component, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { TodoService } from '../services/todo.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos: Todo[] = [];

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {
    paging: false,
    searching: false
  };

  dtTrigger: Subject<unknown> = new Subject();

  constructor(
    private todo: TodoService
  ) { }

  ngOnInit() {
    this.todo.getTodos().subscribe(todos => {
      this.todos = todos;
      this.dtOptions = {
        paging: true
      };
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerenderTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
}
