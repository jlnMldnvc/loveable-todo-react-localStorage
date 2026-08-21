import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tasks" },
      { name: "description", content: "A simple dark to-do app." },
      { property: "og:title", content: "Tasks" },
      { property: "og:description", content: "A simple dark to-do app." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type Task = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

const STORAGE_KEY = "tasks";

function Index() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as Task[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // ignore storage errors
    }
  }, [tasks]);

  const sortedTasks = useMemo(
    () =>
      [...tasks].sort((a, b) => {
        if (a.completed === b.completed) return b.createdAt - a.createdAt;
        return a.completed ? 1 : -1;
      }),
    [tasks]
  );

  const addTask = useCallback(() => {
    const text = inputValue.trim();
    if (!text) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
    setInputValue("");
    inputRef.current?.focus();
  }, [inputValue]);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed, createdAt: Date.now() } : t))
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask();
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-md">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Tasks</h1>

        <div className="mt-6 flex items-center gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What needs to be done?"
            className="h-12 flex-1 rounded-xl border-border bg-card px-4 text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
            aria-label="New task"
          />
          <Button
            onClick={addTask}
            disabled={!inputValue.trim()}
            size="icon"
            className="h-12 w-12 shrink-0 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            aria-label="Add task"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        <ul className="mt-6 space-y-2">
          {sortedTasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
          ))}
          {sortedTasks.length === 0 && (
            <li className="py-10 text-center text-sm text-muted-foreground">No tasks yet.</li>
          )}
        </ul>
      </div>
    </main>
  );
}

function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <li className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 sm:gap-4 sm:p-4">
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="h-5 w-5 shrink-0 border-muted-foreground data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
      />
      <label
        htmlFor={`task-${task.id}`}
        className={`min-w-0 flex-1 cursor-pointer text-sm leading-relaxed sm:text-base ${
          task.completed ? "text-muted-foreground line-through" : "text-foreground"
        }`}
      >
        {task.text}
      </label>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(task.id)}
        className="h-9 w-9 shrink-0 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        aria-label="Delete task"
      >
        <X className="h-4 w-4" />
      </Button>
    </li>
  );
}
