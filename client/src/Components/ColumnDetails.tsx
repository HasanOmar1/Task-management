import { useState } from "react";
import { useGetTasksQuery } from "../api/tasksApi";
import { TaskType } from "../types/TaskType";

type ColumnDetailsProps = {
  status: string;
};

const ColumnDetails = ({ status }: ColumnDetailsProps) => {
  const [priorityStatus, setPriorityStatus] = useState<{
    [key: string]: boolean;
  }>({});

  const {
    data: tasks,
    isLoading: loadingTasks,
    error: errorTasks,
    isSuccess: isSuccessTasks,
  } = useGetTasksQuery(status);

  const handlePriorityStatus = (taskId: number) => {
    setPriorityStatus((prevStatus) => ({
      ...prevStatus,
      [taskId]: !prevStatus[taskId],
    }));
  };

  const taskStatusColor = (color: string) => {
    return color === "Low"
      ? "low"
      : color === "Medium"
      ? "medium"
      : color === "High"
      ? "high"
      : "very-high";
  };

  if (errorTasks) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <div className="col">
      <div className="status">
        <h3>📃 {status}</h3>
      </div>

      <div className="tasks-container">
        {loadingTasks && <h3 className="loading">Loading...</h3>}
        {isSuccessTasks && (
          <>
            {tasks.map((task: TaskType) => (
              <div key={task.taskId} className="task">
                <div className="assign-container">
                  <span>{task.assignor}</span> assigned a task to
                  <span>{task.assignTo}</span> on{" "}
                  <span>{task.creationDate.slice(0, 10)}</span>
                </div>
                <p className="task-content">{task.task}</p>

                <div className="status-priority-container">
                  <div className="status-container">
                    <p>Status</p>
                    <p className="border">{task.status}</p>
                  </div>

                  <hr className="barrier" />

                  <div className="priority-container">
                    <p>Priority</p>
                    <div className="priority-popup">
                      {priorityStatus[task.taskId] && (
                        <div className="priority-options">
                          <p
                            className="select-priority"
                            onClick={() => handlePriorityStatus(task.taskId)}
                          >
                            Low
                          </p>
                          <p
                            className="select-priority"
                            onClick={() => handlePriorityStatus(task.taskId)}
                          >
                            Medium
                          </p>
                          <p
                            className="select-priority"
                            onClick={() => handlePriorityStatus(task.taskId)}
                          >
                            High
                          </p>
                          <p
                            className="select-priority"
                            onClick={() => handlePriorityStatus(task.taskId)}
                          >
                            Very High
                          </p>
                        </div>
                      )}

                      <p
                        className={`${taskStatusColor(
                          task.priority
                        )} border select-priority`}
                        onClick={() => handlePriorityStatus(task.taskId)}
                      >
                        {task.priority}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ColumnDetails;
