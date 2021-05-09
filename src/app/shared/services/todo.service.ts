import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  url = environment.url;

  constructor(
    private http: HttpClient
  ) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.url}/todos`);
  }
}
