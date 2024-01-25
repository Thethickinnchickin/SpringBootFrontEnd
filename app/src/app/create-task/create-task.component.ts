import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../_services/task-service/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService
  ) {}



  onSave(): void {
    // Call the updateTask method from the TaskService
    this.taskService.createTask(this.data.task).subscribe({
      next: (result: any) => {
        // Close the dialog on successful update
        this.dialogRef.close();
      },
      error: (error: any) => {
        if(error.status == 200) {
          this.dialogRef.close();
        }
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
