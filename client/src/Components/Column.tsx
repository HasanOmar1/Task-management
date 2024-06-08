import "../Styles/Column.css";

const Column = () => {
  return (
    <div className="Column">
      <div className="big-container">
        <div className="col">
          <div className="status">
            <h3>📃 Pending</h3>
          </div>
          <div className="todos-container"></div>
        </div>

        <div className="col">
          <div className="status">
            <h3>📃 In Progress</h3>
          </div>
        </div>

        <div className="col">
          <div className="status">
            <h3>📃 Completed</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Column;
