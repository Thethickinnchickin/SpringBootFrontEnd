import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../_services/task-service/task.service';

@Component({
  selector: 'app-mark-comp',
  templateUrl: './mark-comp.component.html',
  styleUrl: './mark-comp.component.css'
})
export class MarkCompComponent  {
  constructor(
    public dialogRef: MatDialogRef<MarkCompComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService
  ) {}


  markComplete(): void {
    // Call the updateTask method from the TaskService
    console.log(this.data);
    this.data.task.isCompleted = true;
    console.log(this.data.task)
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


}
