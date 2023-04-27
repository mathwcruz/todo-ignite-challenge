import { useState, useCallback, useEffect } from "react";
import { v4 as uuid } from "uuid";

import { CreateNewTaskForm } from "./components/CreateNewTaskForm";
import { Header } from "./components/Header";
import { ToDoList } from "./components/ToDoList";
import { ToDoTaskInterface } from "./@types/Task";

export function App() {
  const [toDoList, setTodoList] = useState<ToDoTaskInterface[]>([]);

  useEffect(() => {
    getToDoListFromLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveToDoListOnLocalStorage = useCallback((currentToDoList: ToDoTaskInterface[]) => {
    localStorage.setItem("@todo-ignite-challenge#23", JSON.stringify(currentToDoList));
  }, []);

  const getToDoListFromLocalStorage = useCallback(() => {
    const toDoListFromLocalStorageFormatted: ToDoTaskInterface[] = JSON.parse(
      localStorage.getItem("@todo-ignite-challenge#23") as string
    );

    if (toDoListFromLocalStorageFormatted?.length > 0) {
      setTodoList(toDoListFromLocalStorageFormatted);
    }
  }, []);

  const handleCreateNewTask = useCallback(
    (taskText: string) => {
      if (!taskText) {
        return;
      }

      const newTaskToAdd: ToDoTaskInterface = {
        id: uuid(),
        task: taskText,
        isDone: false,
      };

      const toDoListUpdatedAfterTaskCreation: ToDoTaskInterface[] = [...toDoList, newTaskToAdd];

      setTodoList(toDoListUpdatedAfterTaskCreation);
      saveToDoListOnLocalStorage(toDoListUpdatedAfterTaskCreation);
    },
    [toDoList, saveToDoListOnLocalStorage]
  );

  const handleCompleteTask = useCallback(
    (taskId: string, isTaskDone: boolean) => {
      if (!taskId) {
        return;
      }

      const toDoListUpdatedAfterTaskCompletion: ToDoTaskInterface[] =
        toDoList?.map((task) =>
          task?.id === taskId ? { ...task, isDone: isTaskDone } : task
        );

      setTodoList(toDoListUpdatedAfterTaskCompletion);
      saveToDoListOnLocalStorage(toDoListUpdatedAfterTaskCompletion);
    },
    [toDoList, saveToDoListOnLocalStorage]
  );

  const handleDeleteTask = useCallback(
    (taskId: string) => {
      if (!taskId) {
        return;
      }

      const toDoListUpdatedAfterTaskDeletion: ToDoTaskInterface[] =
        toDoList?.filter((task) => task?.id !== taskId);

      setTodoList(toDoListUpdatedAfterTaskDeletion);
      saveToDoListOnLocalStorage(toDoListUpdatedAfterTaskDeletion);
    },
    [toDoList, saveToDoListOnLocalStorage]
  );

  return (
    <main>
      <Header />
      <CreateNewTaskForm onCreateNewTask={handleCreateNewTask} />
      <ToDoList
        toDoList={toDoList}
        onCompleteTask={handleCompleteTask}
        onDeleteTask={handleDeleteTask}
      />
    </main>
  );
}
