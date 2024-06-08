import "../Styles/Column.css";
import ColumnDetails from "./ColumnDetails";

const Column = () => {
  return (
    <div className="Column">
      <div className="big-container">
        <ColumnDetails status="Pending" />
        <ColumnDetails status="In Progress" />
        <ColumnDetails status="Completed" />
      </div>
    </div>
  );
};

export default Column;
