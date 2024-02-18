import React from "react";

import { useState } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../stores";
import { TaskStatus } from "../interfaces";

interface Props {
  value: TaskStatus;
}

export const useTask = ({ value }: Props) => {
  const TotalTask = useTaskStore((state) => state.getTaskByStatus(value));
  const [onDragOver, setOnDragOver] = useState(false);
  const isDragging = useTaskStore((state) => !!state.draggingTaskId);

  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const addTask = useTaskStore((state) => state.addTask);
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);

    onTaskDrop(value);
  };

  const handeAddTask = async () => {
    await Swal.fire({
      title: "Crear Tarea",
      input: "text",
      inputLabel: "Titulo le la tarea",
      inputPlaceholder: "Por favor agrega la nueva tarea",
      showCancelButton: true,
      confirmButtonText: "Crear",
      showLoaderOnConfirm: true,
      inputValidator: (value) => {
        if (!value) {
          return "Por favor agrega un titulo";
        }
      },
      preConfirm: (title) => {
        addTask(title, value);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };
  return {
    TotalTask,
    onDragOver,
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handeAddTask,
  };
};
