"use client";
import { Button } from '@repo/ui/button';
import { NotebookPen, Plus } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@repo/ui/drawer";
import { useTodoStore } from "~/store/useToDoStore";
import { Separator } from '@repo/ui/separator';
import TaskList from './task-list';

export default function ToDoListMobile() {
  const { toggleAdd } = useTodoStore();

  return (
    <main className="block sm:hidden">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" size="lg" className="lg:h-12 lg:w-32">
            <NotebookPen />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="px-2">
          <DrawerHeader>
            <DrawerTitle className="mx-1">
              <NotebookPen />
              <div className="mb-2 mt-4 text-left text-lg font-bold">
                befocus/todolist
              </div>
              <Separator className="mt-4 bg-white" />
            </DrawerTitle>
            {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
          </DrawerHeader>

          <div className="px-5 pb-12">
            <TaskList />
          </div>

          <DrawerFooter>
            <Button
              onClick={() => toggleAdd()}
              className="absolute bottom-6 right-6"
            >
              <Plus />
            </Button>

            {/* <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </main>
  );
}