import { useMemo } from "react";

import type { ToDoTaskInterface } from "../@types/Task";
import { ToDoTask } from "./ToDoTask";

import clipboardImg from "../assets/clipboard.svg";

interface ToDoListProps {
  toDoList: ToDoTaskInterface[];
  onCompleteTask: (taskId: string, isTaskDone: boolean) => void;
  onDeleteTask: (taskId: string) => void;
}

export function ToDoList({ toDoList, onCompleteTask, onDeleteTask }: ToDoListProps) {
  const totalTasksCompleted: number = useMemo(
    () => toDoList?.filter((task) => !!task?.isDone)?.length,
    [toDoList]
  );

  const toDoListOrderly: ToDoTaskInterface[] = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    () => toDoList?.sort((a, _) => a?.isDone ? 1 : -1),
    [toDoList]
  );

  return (
    <div className="mt-10 mb-6 w-full max-w-[736px] mx-auto px-2">
      <header className="w-full flex flex-row items-center justify-between gap-4 mb-6">
        <div className="flex flex-row items-center justify-center gap-2 font-bold text-sm leading-4 text-blue-400">
          Tarefas criadas{" "}
          <span className="px-2 py-[2px] rounded-full bg-gray-400 text-gray-200 text-xs font-bold">
            {toDoList?.length}
          </span>
        </div>
        <div className="flex flex-row items-center justify-center gap-2 font-bold text-sm leading-4 text-purple-400">
          Concluídas{" "}
          <span className="px-2 py-[2px] rounded-full bg-gray-400 text-gray-200 text-xs font-bold">
            {totalTasksCompleted === 0
              ? "0"
              : `${totalTasksCompleted} de ${toDoList?.length}`}
          </span>
        </div>
      </header>

      {toDoList?.length === 0 ? (
        <div className="py-16 px-6 flex items-center justify-center gap-4 flex-col border-t border-gray-400">
          <img
            src={clipboardImg}
            alt="Imagem ilustrativa de uma prancheta branca"
          />
          <div className="flex flex-col items-center justify-center">
            <strong className="font-bold text-base leading-[22px] text-center text-gray-300">
              Você ainda não tem tarefas cadastradas
            </strong>
            <p className="font-normal text-base leading-[22px] text-center text-gray-300">
              Crie tarefas e organize seus itens a fazer
            </p>
          </div>
        </div>
      ) : (
        <ul className="flex flex-col items-center justify-center gap-3">
          {toDoListOrderly?.map((task) => (
            <ToDoTask
              key={task?.id}
              task={task}
              onCompleteTask={onCompleteTask}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
