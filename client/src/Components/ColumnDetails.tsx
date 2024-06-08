import { useGetTasksQuery } from "../api/tasksApi";
import { TaskType } from "../types/TaskType";

type ColumnDetailsProps = {
  status: string;
};

const ColumnDetails = ({ status }: ColumnDetailsProps) => {
  const {
    data: tasks,
    isLoading: loadingTasks,
    error: errorTasks,
    isSuccess: isSuccessTasks,
  } = useGetTasksQuery(status);

  console.log(tasks);

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
                  <span>{task.assignTo}</span>
                </div>
                <p className="task-content">{task.task}</p>

                <div className="status-priority-container">
                  <div className="status-container">
                    <p>Status</p>
                    <p>{task.status}</p>
                  </div>

                  <hr className="barrier" />

                  <div className="priority-container">
                    <p>Priority</p>
                    <p className={`${taskStatusColor(task.priority)}`}>
                      {task.priority}
                    </p>
                  </div>
                </div>
                {/* <p className="date">{task.creationDate}</p> */}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ColumnDetails;
