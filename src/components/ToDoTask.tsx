import { Trash } from "phosphor-react";

import { ToDoTaskInterface } from "../@types/Task";

interface ToDoTaskProps {
  task: ToDoTaskInterface;
  onDeleteTask: (taskId: string) => void;
}

export function ToDoTask({ task, onDeleteTask }: ToDoTaskProps) {
  return (
    <li className="w-full flex flex-row items-start justify-between p-4 gap-3 bg-gray-500 rounded-lg border border-gray-400">
      <span>Checkbox</span>
      <p className={`${task?.isDone ? "line-through text-gray-300" : ""} font-normal text-sm text-gray-100 leading-[19px] text-left`}>{task?.task}</p>
      <button type="button" onClick={() => onDeleteTask(task?.id)}>
        <Trash className="hover:text-red-600 transition-colors ease-linear text-gray-300" size={18} />
      </button>
    </li>
  );
}
