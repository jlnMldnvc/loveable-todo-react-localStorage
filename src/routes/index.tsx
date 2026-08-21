import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "To Do" },
      { name: "description", content: "A simple to-do app." },
      { property: "og:title", content: "To Do" },
      { property: "og:description", content: "A simple to-do app." },
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

  const activeTasks = useMemo(
    () => tasks.filter((t) => !t.completed).sort((a, b) => b.createdAt - a.createdAt),
    [tasks]
  );
  const completedTasks = useMemo(
    () => tasks.filter((t) => t.completed).sort((a, b) => b.createdAt - a.createdAt),
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

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask();
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto w-full max-w-xl">
        <h1 className="text-3xl font-bold text-foreground">To Do</h1>

        <div className="mt-6 flex items-center gap-2 rounded-lg border border-input bg-background p-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a task..."
            className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0"
            aria-label="New task"
          />
          <Button
            onClick={addTask}
            disabled={!inputValue.trim()}
            size="sm"
            className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            <span className="ml-1 hidden sm:inline">Add</span>
          </Button>
        </div>

        <section className="mt-8">
          <h2 className="text-sm font-semibold text-muted-foreground">To Do ({activeTasks.length})</h2>
          <ul className="mt-3 space-y-2">
            {activeTasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
            ))}
            {activeTasks.length === 0 && (
              <li className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                No tasks yet.
              </li>
            )}
          </ul>
        </section>

        {completedTasks.length > 0 && (
          <section className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-muted-foreground">Completed ({completedTasks.length})</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCompleted}
                className="h-auto px-2 py-1 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                Clear
              </Button>
            </div>
            <ul className="mt-3 space-y-2">
              {completedTasks.map((task) => (
                <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
              ))}
            </ul>
          </section>
        )}
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
    <li className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
      />
      <label
        htmlFor={`task-${task.id}`}
        className={`min-w-0 flex-1 cursor-pointer text-sm font-medium ${
          task.completed ? "text-muted-foreground line-through" : "text-foreground"
        }`}
      >
        {task.text}
      </label>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(task.id)}
        className="h-8 w-8 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        aria-label="Delete task"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </li>
  );
}
