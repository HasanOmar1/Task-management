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

  if (errorTasks) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <div className="col">
      <div className="status">
        <h3>📃 {status}</h3>
      </div>
      <div className="todos-container">
        {loadingTasks && <h3 className="loading">Loading...</h3>}
        {isSuccessTasks && (
          <>
            {tasks.map((task: TaskType) => (
              <div key={task.taskId}>
                <p>{task.assignTo}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ColumnDetails;
