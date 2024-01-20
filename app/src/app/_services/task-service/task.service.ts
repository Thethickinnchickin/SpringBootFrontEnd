// task.service.ts
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, finalize, of, throwError } from 'rxjs';
import { Task } from '../../_models/task.model';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private apiUrl = 'http://localhost:8080'; // Replace with your Spring Boot API URL
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private tokenKey = 'user_token';

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {}

  private getHeaders(): HttpHeaders | null {
    if (this.document.defaultView && this.document.defaultView.localStorage) {
      const token = localStorage.getItem(this.tokenKey);
      console.log(token)
      if (token) {
        return new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        });
      }
    }

    // return new HttpHeaders({
    //   'Content-Type': 'application/json',
    // });
    return null;
  }
  private fetchingTasks = false;
  private deletingTasks = false;

  getTasks(): Observable<Task[]> {
    const headers = this.getHeaders();
    if (this.fetchingTasks || !headers) {
      // Prevent concurrent requests
      return of([]);
    }
    
    console.log(headers)
    this.fetchingTasks = true;
  
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`, { headers }).pipe(
      finalize(() => {
        this.fetchingTasks = false;
        console.log('After fetching tasks');
      })
    );
  }

  createTask(task: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tasks`, task, { headers: this.headers });
  }

  updateTask(taskId: number, task: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/tasks/${taskId}`, task, { headers: this.headers });
  }

  deleteTask(taskId: number): Observable<any> | null {  
    const headers = this.getHeaders();
    if (this.deletingTasks || !headers) {
      // Prevent concurrent requests
      return null;
    }

    this.fetchingTasks = true;
  
    return this.http.delete<any>(`${this.apiUrl}/tasks/${taskId}`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        //console.error('Error deleting task:', error);
        return throwError(error);
      })
    );
  }
  
  
}
