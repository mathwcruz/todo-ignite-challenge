import { ChangeEvent, FormEvent, useState } from "react";
import { PlusCircle } from "phosphor-react";

interface CreateNewTaskFormProps {
  onCreateNewTask: (taskText: string) => void;
}

export function CreateNewTaskForm({ onCreateNewTask }: CreateNewTaskFormProps) {
  const [newTaskText, setNewTaskText] = useState<string>("");

  const handleCreateNewTask = (e: FormEvent) => {
    e.preventDefault();

    onCreateNewTask(newTaskText?.trim());
    setNewTaskText("");
  };

  return (
    <form
      onSubmit={handleCreateNewTask}
      className="-translate-y-7 -mt-[1px] sm:-mt-0 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 mx-auto w-full h-[56px] px-2"
    >
      <input
        name="new-task"
        type="text"
        value={newTaskText}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTaskText(e.target.value)}
        placeholder="Adicione uma nova tarefa"
        className="h-full w-full max-w-[638px] bg-gray-500 p-4 border border-gray-700 rounded-lg font-normal text-base text-gray-100 placeholder:text-gray-300 outline-none transition-shadow ease-linear focus:ring-1 focus:ring-purple-700"
      />
      <button
        type="submit"
        title={!newTaskText ? "Preencha o campo ao lado esquerdo" : ""}
        disabled={!newTaskText}
        className="h-full w-full sm:w-max max-w-none sm:max-w-[638px] flex flex-row justify-center items-center gap-2 border-none bg-blue-700 rounded-lg p-4 text-gray-100 font-bold text-sm transition-all ease-linear outline-none disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-blue-700 hover:bg-blue-400 focus:ring-1 focus:ring-gray-100"
      >
        Criar
        <PlusCircle weight="bold" size={16} color="#F2F2F2" />
      </button>
    </form>
  );
}
