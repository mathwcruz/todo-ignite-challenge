import * as Checkbox from "@radix-ui/react-checkbox";
import { Check, Trash } from "phosphor-react";

import { ToDoTaskInterface } from "../@types/Task";

interface ToDoTaskProps {
  task: ToDoTaskInterface;
  onCompleteTask: (taskId: string, isTaskDone: boolean) => void;
  onDeleteTask: (taskId: string) => void;
}

export function ToDoTask({ task, onCompleteTask, onDeleteTask }: ToDoTaskProps) {
  return (
    <li className="w-full flex flex-row items-start justify-between p-4 gap-3 bg-gray-500 rounded-lg border border-gray-400">
      <Checkbox.Root
        className={`h-[18px] w-[18px] appearance-none flex items-center justify-center rounded-full outline-none border p-1 transition-colors ease-linear hover:border-blue-700 ${
          task?.isDone ? "border-purple-700 bg-purple-700" : "border-blue-400"
        }`}
        checked={task?.isDone}
        onCheckedChange={(checked: boolean) => onCompleteTask(task?.id, checked)}
      >
        <Checkbox.Indicator>
          <Check weight="bold" color="#F2F2F2" size={12} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <p
        className={`font-normal text-sm text-gray-100 leading-[19px] text-left transition-all ease-linear ${
          task?.isDone ? "line-through text-gray-300" : ""
        }`}
      >
        {task?.task}
      </p>
      <button type="button" onClick={() => onDeleteTask(task?.id)}>
        <Trash
          className="hover:text-red-600 transition-colors ease-linear text-gray-300"
          size={18}
        />
      </button>
    </li>
  );
}
