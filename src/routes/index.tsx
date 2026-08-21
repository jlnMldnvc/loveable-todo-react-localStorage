import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { Check, Plus, Trash2, Calendar, ListTodo, CheckCircle2, Circle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TaskFlow — Modern To Do App" },
      { name: "description", content: "A clean, modern to-do app to manage your daily tasks and track completed work." },
      { property: "og:title", content: "TaskFlow — Modern To Do App" },
      { property: "og:description", content: "A clean, modern to-do app to manage your daily tasks and track completed work." },
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

const STORAGE_KEY = "taskflow-tasks";

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
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
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

  const progress = useMemo(() => {
    if (tasks.length === 0) return 0;
    return Math.round((completedTasks.length / tasks.length) * 100);
  }, [tasks.length, completedTasks.length]);

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
    setDeletingIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 200);
  }, []);

  const clearCompleted = useCallback(() => {
    const ids = new Set(completedTasks.map((t) => t.id));
    setDeletingIds(ids);
    setTimeout(() => {
      setTasks((prev) => prev.filter((t) => !t.completed));
      setDeletingIds(new Set());
    }, 200);
  }, [completedTasks]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask();
    }
  };

  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-8 sm:mb-10">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Calendar className="h-4 w-4 shrink-0" />
                <span className="truncate">{today}</span>
              </div>
              <h1 className="mt-1 truncate text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                My Tasks
              </h1>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-2xl font-bold tabular-nums text-primary">{progress}%</div>
              <div className="text-xs font-medium text-muted-foreground">
                {completedTasks.length}/{tasks.length} done
              </div>
            </div>
          </div>

          <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              role="progressbar"
            />
          </div>
        </header>

        <Card className="overflow-hidden border border-border bg-card shadow-sm">
          <CardContent className="p-4 sm:p-5">
            <div
              className={cn(
                "flex items-center gap-2 rounded-xl border bg-background px-3 py-2 transition-all sm:gap-3 sm:px-4 sm:py-3",
                isInputFocused ? "border-primary ring-2 ring-primary/20" : "border-input"
              )}
            >
              <ListTodo className="h-5 w-5 shrink-0 text-muted-foreground" />
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                placeholder="What needs to be done?"
                className="h-10 flex-1 border-0 bg-transparent px-0 text-base shadow-none placeholder:text-muted-foreground focus-visible:ring-0"
                aria-label="New task"
              />
              <Button
                onClick={addTask}
                disabled={!inputValue.trim()}
                size="sm"
                className="shrink-0 gap-1 rounded-lg bg-primary px-4 text-primary-foreground shadow-none hover:bg-primary/90 disabled:opacity-50"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              <Circle className="h-4 w-4" />
              To Do ({activeTasks.length})
            </h2>
          </div>

          {activeTasks.length === 0 ? (
            <EmptyState message="No tasks yet. Add one above to get started." />
          ) : (
            <ul className="space-y-2">
              {activeTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  isDeleting={deletingIds.has(task.id)}
                />
              ))}
            </ul>
          )}
        </section>

        {completedTasks.length > 0 && (
          <section className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-success" />
                Completed ({completedTasks.length})
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCompleted}
                className="h-auto px-2 py-1 text-xs font-medium text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                Clear completed
              </Button>
            </div>

            <ul className="space-y-2">
              {completedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  isDeleting={deletingIds.has(task.id)}
                />
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
  isDeleting,
}: {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}) {
  return (
    <li
      className={cn(
        "group flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-sm transition-all hover:border-primary/30 hover:shadow-md sm:gap-4 sm:p-4",
        task.completed && "bg-muted/40",
        isDeleting ? "task-leave" : "task-enter"
      )}
    >
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="shrink-0"
        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
      />
      <label
        htmlFor={`task-${task.id}`}
        className={cn(
          "min-w-0 flex-1 cursor-pointer text-sm font-medium leading-relaxed transition-all sm:text-base",
          task.completed && "text-muted-foreground line-through"
        )}
      >
        {task.text}
      </label>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(task.id)}
        className="h-8 w-8 shrink-0 rounded-lg text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 hover:bg-destructive/10 hover:text-destructive sm:h-9 sm:w-9"
        aria-label="Delete task"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </li>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <Card className="border border-dashed border-border bg-card/50">
      <CardContent className="flex flex-col items-center justify-center px-6 py-10 text-center">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-muted">
          <Check className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
}
