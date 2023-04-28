import { useState, useCallback, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CreateNewTaskForm } from "./components/CreateNewTaskForm";
import { Header } from "./components/Header";
import { ToDoList } from "./components/ToDoList";
import { ToDoTaskInterface } from "./@types/Task";
import { ToastMessage } from "./@types/Toast";
import { showToastMessage } from "./utils/toast";
import { sortToDoList } from "./utils/task";

export function App() {
  const [toDoList, setTodoList] = useState<ToDoTaskInterface[]>([]);

  useEffect(() => {
    getToDoListFromLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveToDoListOnLocalStorage = useCallback(
    (currentToDoList: ToDoTaskInterface[]) => {
      localStorage.setItem(
        "@todo-ignite-challenge#23",
        JSON.stringify(currentToDoList)
      );
    },
    []
  );

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

      const toDoListUpdatedAfterTaskCreation: ToDoTaskInterface[] =
        sortToDoList([...toDoList, newTaskToAdd]);

      setTodoList(toDoListUpdatedAfterTaskCreation);
      saveToDoListOnLocalStorage(toDoListUpdatedAfterTaskCreation);
      showToastMessage(ToastMessage.TASK_CREATED_SUCCESSFULLY);
    },
    [toDoList, saveToDoListOnLocalStorage]
  );

  const handleToggleCompleteTask = useCallback(
    (taskId: string, isTaskDone: boolean) => {
      if (!taskId) {
        return;
      }

      const taskToComplete: ToDoTaskInterface =
        toDoList?.find((task) => task?.id === taskId) ||
        ({} as ToDoTaskInterface);

      const toDoListUpdatedAfterTaskCompletion: ToDoTaskInterface[] =
        sortToDoList(
          toDoList?.map((task) =>
            task?.id === taskToComplete?.id
              ? { ...task, isDone: isTaskDone }
              : task
          )
        );

      setTodoList(toDoListUpdatedAfterTaskCompletion);
      saveToDoListOnLocalStorage(toDoListUpdatedAfterTaskCompletion);

      if (isTaskDone) {
        showToastMessage(
          ToastMessage.TASK_COMPLETED_SUCCESSFULLY,
          taskToComplete?.task
        );
      }
    },
    [toDoList, saveToDoListOnLocalStorage]
  );

  const handleDeleteTask = useCallback(
    (taskId: string) => {
      if (!taskId) {
        return;
      }

      const taskToRemove: ToDoTaskInterface =
        toDoList?.find((task) => task?.id === taskId) ||
        ({} as ToDoTaskInterface);

      const toDoListUpdatedAfterTaskDeletion: ToDoTaskInterface[] =
        sortToDoList(toDoList?.filter((task) => task?.id !== taskToRemove?.id));

      setTodoList(toDoListUpdatedAfterTaskDeletion);
      saveToDoListOnLocalStorage(toDoListUpdatedAfterTaskDeletion);
      showToastMessage(
        ToastMessage.TASK_DELETED_SUCCESSFULLY,
        taskToRemove?.task
      );
    },
    [toDoList, saveToDoListOnLocalStorage]
  );

  return (
    <main>
      <Header />
      <CreateNewTaskForm onCreateNewTask={handleCreateNewTask} />
      <ToDoList
        toDoList={toDoList}
        onToggleCompleteTask={handleToggleCompleteTask}
        onDeleteTask={handleDeleteTask}
      />
      <ToastContainer theme="dark" />
    </main>
  );
}
