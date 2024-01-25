import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../_services/task-service/task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TaskEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.setPriority(this.data.task.priority);
  }

  onSave(): void {
    // Call the updateTask method from the TaskService
    console.log(this.data);
    this.taskService.updateTask(this.data.task.id, this.data.task).subscribe({
      next: (result: any) => {
        // Close the dialog on successful update
        this.dialogRef.close();
      },
      error: (error: any) => {
        console.error('Error updating task:', error);
        // Handle error if needed
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  setPriority(priority: string): void {
    // Remove 'selected' class from all buttons
    document.querySelectorAll('.priority').forEach(button => {
      button.classList.remove('selected');
    });

    this.data.task.priority = priority;
  
    // Add 'selected' class to the button corresponding to the priority
    const button = document.getElementById(priority);
    if (button) {
      button.classList.add('selected');
    }
  }
}
