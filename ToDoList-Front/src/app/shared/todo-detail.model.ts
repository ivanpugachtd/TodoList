export class TodoDetail {
  Id: number;
  TaskText: string;
  TimeOfCreation: string;
  IsComplete: boolean;
  Priority: Priorities;
}

export enum Priorities {
  Critical = 1,
  High,
  Medium,
  Low
}

export class Page {
  countTasks: number;
  tasksPage: TodoDetail[];
}
