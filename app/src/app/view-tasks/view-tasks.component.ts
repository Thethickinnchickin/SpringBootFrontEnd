// view-tasks.component.ts
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../_services/task-service/task.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskEditComponent } from '../task-edit/task-edit.component';
import { CreateTaskComponent } from '../create-task/create-task.component';


@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css']
})
export class ViewTasksComponent implements OnInit {
  tasks: any[] = [];

  constructor(private taskService: TaskService, public editDialog: MatDialog,
    public createDialog: MatDialog) {}

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
    const dialogRef = this.editDialog.open(TaskEditComponent, {
      data: { task },
      disableClose: true // Pass the task data to the dialog
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle the result after the dialog is closed
      console.log('The dialog was closed', result);
    });
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

  // Method to open the TaskEditComponent for creating a new task
  openCreateTaskDialog(): void {
    const dialogRef = this.createDialog.open(CreateTaskComponent, {
      data: { task: {} }, // Pass an empty task for creating a new one
      disableClose: true // Prevent closing by clicking outside the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result after the dialog is closed
      console.log('The dialog was closed', result);
      window.location.reload();
    });
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'Low':
        return '#006400'; // Dark green
      case 'Medium':
        return '#8B4513'; // Saddle brown
      case 'High':
        return '#8B0000'; // Dark red
      default:
        return '#000'; // Default color
    }
  }
  
  

}
