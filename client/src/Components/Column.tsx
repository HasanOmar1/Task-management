import { useEffect, useState } from "react";
import "../Styles/Column.css";
import ColumnDetails from "./ColumnDetails";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useGetTasksQuery } from "../api/tasksApi";

const Column = () => {
  const { data: tasks, isSuccess } = useGetTasksQuery("pending");
  const [newTasks, setNewTasks] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setNewTasks(tasks);
    }
  }, [isSuccess]);

  const handleDragEnd = (result: DropResult) => {
    const items = Array.from(newTasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result?.destination?.index || 0, 0, reorderedItem);
    setNewTasks(items);
  };

  return (
    <div className="Column">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="big-container">
          <ColumnDetails status="Pending" array={newTasks} />
          {/* <ColumnDetails status="In Progress" /> */}
          {/* <ColumnDetails status="Completed" /> */}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Column;
