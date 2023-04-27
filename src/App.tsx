import { useState, useCallback } from "react";
import { v4 as uuid } from "uuid"

import { CreateNewTaskForm } from "./components/CreateNewTaskForm";
import { Header } from "./components/Header";
import { ToDoList } from "./components/ToDoList";
import { ToDoTaskInterface } from "./@types/Task";

export function App() {
  const [toDoList, setTodoList] = useState<ToDoTaskInterface[]>([]);

  const handleCreateNewTask = useCallback(
    (taskText: string) => {
      if (!taskText) {
        return;
      }

      const newTaskToAdd: ToDoTaskInterface = { id: uuid(), task: taskText, isDone: false }

      setTodoList((old) => [...old, newTaskToAdd]);
    },
    []
  );

  const handleDeleteTask = useCallback(
    (taskId: string) => {
      if (!taskId) {
        return;
      }

      const toDoListUpdatedAfterTaskDeletion: ToDoTaskInterface[] =
        toDoList?.filter((task) => task?.id !== taskId);

      setTodoList(toDoListUpdatedAfterTaskDeletion);
    },
    [toDoList]
  );

  return (
    <main>
      <Header />
      <CreateNewTaskForm onCreateNewTask={handleCreateNewTask} />
      <ToDoList toDoList={toDoList} onDeleteTask={handleDeleteTask} />
    </main>
  );
}
