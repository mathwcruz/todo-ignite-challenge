import { ToDoTaskInterface } from "../@types/Task";

export const sortToDoList = (toDoList: ToDoTaskInterface[]): ToDoTaskInterface[] => {
  let toDoListUpdated: ToDoTaskInterface[] = [];

  const uncompletedTasks: ToDoTaskInterface[] = toDoList?.filter((task) => !task?.isDone);
  const completedTasks: ToDoTaskInterface[] = toDoList?.filter((task) => task?.isDone);

  toDoListUpdated = [...uncompletedTasks, ...completedTasks];

  return toDoListUpdated;
}