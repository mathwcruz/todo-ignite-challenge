import { toast } from "react-toastify";

import { ToastMessage } from "../@types/Toast";

const DEFAULT_TOAST_SETTINGS = {
  autoClose: 1500,
  hideProgressBar: true,
  pauseOnHover: true,
};

export const showToastMessage = (type: ToastMessage, task?: string) => {
  switch (type) {
    case ToastMessage.TASK_CREATED_SUCCESSFULLY:
      return toast.success(
        "Nova tarefa criada com sucesso",
        DEFAULT_TOAST_SETTINGS
      );

    case ToastMessage.TASK_COMPLETED_SUCCESSFULLY:
      return toast.success(
        `Tarefa "${task}" concluída com sucesso`,
        DEFAULT_TOAST_SETTINGS
      );

    case ToastMessage.TASK_DELETED_SUCCESSFULLY:
      return toast.success(
        `Tarefa "${task}" removida com sucesso`,
        DEFAULT_TOAST_SETTINGS
      );

    default:
      break;
  }
};
