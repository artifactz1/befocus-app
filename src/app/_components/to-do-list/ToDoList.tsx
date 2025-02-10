import { stagger, useAnimate } from "framer-motion";
import { NotebookPen } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { useTodoStore } from "~/store/useToDoStore"; // Zustand store
import TaskItem from "./task-item";

export default function TodoList() {
  const { tasks, toggleTask } = useTodoStore();
  const [ref, animate] = useAnimate();
  const [newTask, setNewTask] = useState("");
  const { addMode, addTask, toggleAdd } = useTodoStore();

  function handleChange(id: number) {
    toggleTask(id);
  }

  useEffect(() => {
    if (tasks.length === 0) return; // Prevent animation when there are no tasks

    if (tasks.every((task) => task.completed)) {
      const random = Math.random();

      if (random < 1 / 3) {
        animate(
          ".peer",
          { scale: [1, 1.25, 1] },
          { duration: 0.35, delay: stagger(0.075) },
        );
      } else if (random < 2 / 3) {
        animate(
          ".peer",
          { x: [0, 2, -2, 0] },
          { duration: 0.4, delay: stagger(0.1) },
        );
      } else {
        animate(
          ".peer",
          { rotate: [0, 10, -10, 0] },
          { duration: 0.5, delay: stagger(0.1) },
        );
      }
    }
  }, [tasks, animate]); // Runs whenever `tasks` changes

  function handleAddTask() {
    if (newTask.trim() !== "") {
      addTask(newTask);
      setNewTask("");
    }
  }

  return (
    <div className="h-fill">
      <NotebookPen />
      <div className="mb-2 mt-4 text-lg font-bold">befocus/todolist</div>
      <Separator className="my-4 bg-white" />
      <div className="flex min-h-full flex-col items-center justify-center">
        <div className="flex w-full max-w-sm flex-col">
          <div>
            {addMode && (
              <div className="flex items-center border-b-2 py-2">
                <Checkbox className="peer mr-2" />
                <Input
                  type="text"
                  placeholder="Add a task..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddTask();
                      toggleAdd();
                    }
                  }}
                  onBlur={() => {
                    handleAddTask();
                    toggleAdd();
                  }}
                  className="rounded-0 border-input-0 border-0 px-4 focus-visible:ring-0"
                />
              </div>
            )}
          </div>
          <div ref={ref}>
            {tasks
              .filter((task) => !task.archived)
              .map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  handleChange={handleChange}
                />
              ))}
          </div>
          {tasks.some((task) => task.archived) && (
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="border-0">
                <AccordionTrigger className="font-bold">
                  Archived
                </AccordionTrigger>
                <AccordionContent className="pl-2">
                  <div ref={ref}>
                    {tasks
                      .filter((task) => task.archived)
                      .map((task) => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          handleChange={handleChange}
                        />
                      ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </div>
      </div>
    </div>
  );
}
