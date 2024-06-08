import { useState } from "react";
import "../Styles/Column.css";
import { useGetTodosQuery } from "../api/tasksApi";

type TodoType = {
  taskId: number;
  assignor: string;
  task: string;
  assignTo: string;
  status: string;
  priority: string;
  creationDate: string;
};

const Column = () => {
  const {
    data: todos,
    isLoading: loadingTodos,
    error: errorTodos,
  } = useGetTodosQuery();

  if (errorTodos) {
    return <h1>Something went wrong</h1>;
  }

  if (todos) {
    const pendingTodos = todos.filter(
      (todo: TodoType) => todo.status === "Pending"
    );

    const inProgressTodos = todos.filter(
      (todo: TodoType) => todo.status === "In Progress"
    );

    const completedTodos = todos.filter(
      (todo: TodoType) => todo.status === "Completed"
    );
  }

  return (
    <div className="Column">
      <div className="big-container">
        <div className="col">
          <div className="status">
            <h3>📃 Pending</h3>
          </div>
          <div className="todos-container">
            {loadingTodos && <h1>Loading</h1>}
          </div>
        </div>

        <div className="col">
          <div className="status">
            <h3>📃 In Progress</h3>
          </div>
          <div className="todos-container">
            {loadingTodos && <h1>Loading</h1>}
          </div>
        </div>

        <div className="col">
          <div className="status">
            <h3>📃 Completed</h3>
          </div>
          <div className="todos-container">
            {loadingTodos && <h1>Loading</h1>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Column;
