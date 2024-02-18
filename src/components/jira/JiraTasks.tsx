import { IoAddOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import classNames from "classnames";
import { TaskStatus } from "../../interfaces";
import { Tasks } from "./Tasks";
import { useTask } from "../../hooks/useTask";

interface Props {
  title: string;
  value: TaskStatus;
}

export const JiraTasks = ({ title, value }: Props) => {
  const {
    TotalTask,
    onDragOver,
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handeAddTask,
  } = useTask({ value });

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      className={classNames(
        "!text-black relative border-4  flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]",
        {
          "border-gray-500 border-dotted":
            isDragging && onDragOver && value === "OPEN",
          "border-yellow-500 border-dotted":
            isDragging && onDragOver && value === "IN_PROGRESS",
          "border-green-500 border-dotted":
            isDragging && onDragOver && value === "DONE",
        }
      )}
    >
      {/* Task Header */}
      <div className="relative flex flex-row justify-between">
        <div className="flex items-center justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={{ fontSize: "50px" }} />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{title}</h4>
        </div>

        <button onClick={handeAddTask}>
          <IoAddOutline />
        </button>
      </div>

      {/* Task Items */}
      <div className="h-full w-full">
        {TotalTask.map((task) => (
          <Tasks key={task.id} title={task.title} id={task.id} />
        ))}
      </div>
    </div>
  );
};
