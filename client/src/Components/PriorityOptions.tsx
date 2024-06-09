import { TaskType } from "../types/TaskType";

type PriorityOptionsProps = {
  handleUpdateTask: (taskId: number, priority: string) => void;
  task: TaskType;
};

const PriorityOptions = ({ handleUpdateTask, task }: PriorityOptionsProps) => {
  return (
    <div className="priority-options">
      <p
        className="select-priority"
        onClick={() => handleUpdateTask(task.taskId, "Low")}
      >
        Low
      </p>
      <p
        className="select-priority"
        onClick={() => handleUpdateTask(task.taskId, "Medium")}
      >
        Medium
      </p>
      <p
        className="select-priority"
        onClick={() => handleUpdateTask(task.taskId, "High")}
      >
        High
      </p>
      <p
        className="select-priority"
        onClick={() => handleUpdateTask(task.taskId, "Very High")}
      >
        Very High
      </p>
    </div>
  );
};

export default PriorityOptions;
