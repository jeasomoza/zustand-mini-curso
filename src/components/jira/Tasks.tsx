import { IoReorderTwoOutline } from "react-icons/io5";
import { useTaskStore } from "../../stores";

interface Props {
  id: string;
  title: string;
}
export const Tasks = ({ title, id }: Props) => {
  const setDraggingTaskId = useTaskStore((state) => state.setDraggingTaskId);
  const removeDraggingTaskId = useTaskStore(
    (state) => state.removeDraggingTaskId
  );
  return (
    <div
      draggable="true"
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", "This text may be dragged");
        setDraggingTaskId(id);
      }}
      onDragEnd={removeDraggingTaskId}
      className="mt-5 flex items-center justify-between p-2"
    >
      <div className="flex items-center justify-center gap-2">
        <p className="text-base font-bold text-navy-700">{title}</p>
      </div>
      <span className=" h-6 w-6 text-navy-700 cursor-pointer">
        <IoReorderTwoOutline />
      </span>
    </div>
  );
};
