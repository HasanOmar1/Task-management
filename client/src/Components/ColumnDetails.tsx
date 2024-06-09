import { useState } from "react";
import { useGetTasksQuery, useUpdateTaskMutation } from "../api/tasksApi";
import { TaskType } from "../types/TaskType";
import PriorityOptions from "./PriorityOptions";
import { Droppable, Draggable } from "react-beautiful-dnd";

type ColumnDetailsProps = {
  status: string;
  array: TaskType[];
};

const ColumnDetails = ({ status, array }: ColumnDetailsProps) => {
  const [priorityStatus, setPriorityStatus] = useState<{
    [key: string]: boolean;
  }>({});

  const {
    // data: tasks,
    isLoading: loadingTasks,
    error: errorTasks,
    isSuccess: isSuccessTasks,
  } = useGetTasksQuery(status);
  const [updateTask] = useUpdateTaskMutation();

  const handlePriorityStatus = (taskId: number) => {
    setPriorityStatus((prevStatus) => ({
      ...prevStatus,
      [taskId]: !prevStatus[taskId],
    }));
  };

  const handleUpdateTask = (taskId: number, priority: string) => {
    handlePriorityStatus(taskId);

    updateTask({
      id: taskId,
      priority,
    });
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
      <Droppable droppableId={status} type="tasks">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <div className="tasks-container">
              {loadingTasks && <h3 className="loading">Loading...</h3>}
              {isSuccessTasks && (
                <>
                  {array.map((task: TaskType, index: number) => (
                    <Draggable
                      key={task.taskId}
                      draggableId={task.taskId.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div key={task.taskId} className="task">
                            <div className="assign-container">
                              <span>{task.assignor}</span> assigned a task to
                              <span>{task.assignTo}</span> on
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
                                    <PriorityOptions
                                      handleUpdateTask={handleUpdateTask}
                                      task={task}
                                    />
                                  )}

                                  <p
                                    className={`${taskStatusColor(
                                      task.priority
                                    )} border select-priority`}
                                    onClick={() =>
                                      handlePriorityStatus(task.taskId)
                                    }
                                  >
                                    {task.priority}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </>
              )}
            </div>
          </div>
        )}
      </Droppable>
      <div> Add Task </div>
    </div>
  );
};

export default ColumnDetails;
