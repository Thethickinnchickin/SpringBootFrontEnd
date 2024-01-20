// task.model.ts
export interface Task {
    id: number;        // Unique identifier for the task
    title: string;     // Title of the task
    description: string; // Description of the task
    dueDate: Date;     // Due date for the task
    completed: boolean; // Indicates whether the task is completed or not
  }
  