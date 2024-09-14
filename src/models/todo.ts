export interface Todo {
  id: number;
  task: string;
  completed: boolean;
  file? : File| undefined;
}