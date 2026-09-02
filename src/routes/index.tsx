import { createFileRoute } from "@tanstack/react-router";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

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

const loadTasks = (): { tasks: Task[]; error?: string } => {
  if (typeof window === "undefined") return { tasks: [] };
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return { tasks: Array.isArray(parsed) ? parsed : [] };
  } catch {
    return {
      tasks: [],
      error: "Couldn't load your tasks — storage data is corrupted or unavailable.",
    };
  }
};

const byStatusThenNewest = (a: Task, b: Task) =>
  Number(a.completed) - Number(b.completed) || b.createdAt - a.createdAt;

function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const text = value.trim();

  // Read storage after hydration so server and client HTML match.
  useEffect(() => {
    const { tasks: loaded, error: loadError } = loadTasks();
    setTasks(loaded);
    if (loadError) setError(loadError);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      setError("");
    } catch {
      setError("Couldn't save your tasks — storage is unavailable.");
    }
  }, [tasks, ready]);

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
    <main className="page">
      <div className="shell">
        <h1 className="title">{TITLE}</h1>

        <form onSubmit={onSubmit} className="form">
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="What needs to be done?"
            className="input"
            aria-label="New task"
          />
          <button type="submit" disabled={!text} className="add" aria-label="Add task">
            <PlusIcon />
          </button>
        </form>

        {error && (
          <p className="error" role="alert">
            {error}
            <button
              type="button"
              onClick={() => setError("")}
              className="error-close"
              aria-label="Dismiss error"
            >
              <XIcon />
            </button>
          </p>
        )}

        <ul className="list">
          {!ready && <li className="empty">Loading tasks…</li>}
          {ready &&
            sorted.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
            ))}
          {ready && !sorted.length && <li className="empty">No tasks yet.</li>}
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
    <li className="item">
      <input
        type="checkbox"
        id={task.id}
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="check"
        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
      />
      <label htmlFor={task.id} className={task.completed ? "label done" : "label"}>
        {task.text}
      </label>
      <button
        type="button"
        onClick={() => onDelete(task.id)}
        className="delete"
        aria-label="Delete task"
      >
        <XIcon />
      </button>
    </li>
  );
});

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const PlusIcon = () => (
  <svg {...iconProps} width={20} height={20}>
    <path d="M5 12h14M12 5v14" />
  </svg>
);

const XIcon = () => (
  <svg {...iconProps}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
