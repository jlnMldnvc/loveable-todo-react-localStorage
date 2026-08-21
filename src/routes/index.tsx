import { createFileRoute } from "@tanstack/react-router";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const TITLE = "Tasks";
const DESCRIPTION = "A simple dark to-do app.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type Task = { id: string; text: string; completed: boolean; createdAt: number };

const STORAGE_KEY = "tasks";

const loadTasks = (): Task[] => {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const byStatusThenNewest = (a: Task, b: Task) =>
  Number(a.completed) - Number(b.completed) || b.createdAt - a.createdAt;

function Index() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [value, setValue] = useState("");
  const text = value.trim();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      /* storage unavailable */
    }
  }, [tasks]);

  const sorted = useMemo(() => [...tasks].sort(byStatusThenNewest), [tasks]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;
    setTasks((prev) => [
      { id: crypto.randomUUID(), text, completed: false, createdAt: Date.now() },
      ...prev,
    ]);
    setValue("");
  };

  const onToggle = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed, createdAt: Date.now() } : t,
      ),
    );
  }, []);

  const onDelete = useCallback(
    (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id)),
    [],
  );

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-md">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {TITLE}
        </h1>

        <form onSubmit={onSubmit} className="mt-6 flex items-center gap-2">
          <Input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="What needs to be done?"
            className="h-12 flex-1 rounded-xl bg-card px-4 text-base focus-visible:ring-primary"
            aria-label="New task"
          />
          <Button
            type="submit"
            disabled={!text}
            size="icon"
            className="h-12 w-12 shrink-0 rounded-xl disabled:opacity-50"
            aria-label="Add task"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </form>

        <ul className="mt-6 space-y-2">
          {sorted.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
          ))}
          {!sorted.length && (
            <li className="py-10 text-center text-sm text-muted-foreground">No tasks yet.</li>
          )}
        </ul>
      </div>
    </main>
  );
}

const TaskItem = memo(function TaskItem({
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
        id={task.id}
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="h-5 w-5 shrink-0"
        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
      />
      <label
        htmlFor={task.id}
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
});
