import { motion } from "framer-motion";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from '~/components/ui/input';
import { Label } from "~/components/ui/label";
import { useTodoStore } from "~/store/useToDoStore";

interface TaskItemProps {
  task: {
    id: number;
    text: string;
    completed: boolean;
    editMode: boolean;
  };
  handleChange: (id: number) => void;
}

export default function TaskItem({ task, handleChange }: TaskItemProps) {
  const { editTask, toggleEditMode } = useTodoStore();

  return (
    <div className="items-top flex space-x-2 border-b-2 py-2">
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        className="flex items-center"
      >
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => handleChange(task.id)}
          className="peer mr-2"
        />
      </motion.div>

      <Label
        className={`group relative flex w-full cursor-pointer select-none items-center space-x-2 rounded p-2 text-sm font-medium transition-colors duration-300 ${
          task.completed ? "text-stone-500" : "font-semibold"
        }`}
        onClick={() => toggleEditMode(task.id)}
      >
        {/* Text wrapper for dynamic width */}
        

        <span className="relative inline-block">
          {task.text}
          {/* Strikethrough line with smooth transition */}
          <span
            className={`absolute left-0 top-1/2 h-[2px] transition-all duration-500 ${
              task.completed ? "w-full bg-stone-500" : "w-0 bg-white"
            }`}
            style={{ transform: "translateY(-50%)" }}
          ></span>
        </span>
        
        

      </Label>
    </div>
  );
}
