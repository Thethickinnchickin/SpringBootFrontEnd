// view-tasks.component.ts
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../_services/task-service/task.service';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css']
})
export class ViewTasksComponent implements OnInit {
  tasks: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (data: any) => {
        this.tasks = data;
      },
      error: (error: any) => {
        console.error('Error fetching tasks:', error);
      }
    });
  }

  editTask(task: any): void {
    // Implement logic to navigate to the edit task page or show a modal
    console.log('Editing task:', task);
  }

  deleteTask(task: any): void {
    const deleteTaskObservable = this.taskService.deleteTask(task.id)!;

    deleteTaskObservable.subscribe({
      next: (data: any) => {
        // Check if the status code is 200
        if (data && data.status === 200) {
          // Update the UI after successful deletion
          console.log('Deleted task:', task);
          this.tasks = this.tasks.filter(t => t.id !== task.id);
        } else {
          console.error('Unexpected response:', data);
        }
      },
      error: (error: any) => {
        // Check if the error is a 200 status code
        if (error.status === 200) {
          // Update the UI after successful deletion
          console.log('Deleted task:', task);
          this.tasks = this.tasks.filter(t => t.id !== task.id);
        } else {
          //console.error('Error deleting task:', error);
        }
      }
    });
  }

}
