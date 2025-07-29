import React, { useEffect, useState } from "react";

const TrashIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}
    viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const EditIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}
    viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182L7.5 19.21l-4.182.46.46-4.182 12.084-12.001z" />
  </svg>
);

const CheckIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}
    viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M5 13l4 4L19 7"/>
  </svg>
);

const COLORS = {
  accent: "bg-blue-600 hover:bg-blue-700 text-white",
  gray: "bg-zinc-100 hover:bg-zinc-200 text-zinc-700",
  danger: "bg-red-500 hover:bg-red-600 text-white",
  pending: "text-orange-600",
  completed: "text-green-600 line-through",
  button: "inline-flex items-center gap-1 px-3 py-2 rounded-lg transition font-medium shadow-sm disabled:opacity-50 disabled:pointer-events-none text-sm"
};

const TodoList = () => {
  const [list, setList] = useState([]);
  const [item, setItem] = useState("");
  const [filter, setFilter] = useState("all");
  const [isInitialized, setInitialized] = useState(false);
  const [order, setSortOrder] = useState("none");
  const [loading, setLoading] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    if (item.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: item,
      completed: false,
    };
    setList([...list, newTodo]);
    setItem("");
  };

  const deleteItem = (id) => setList(list.filter((item) => item.id !== id));

  const editItem = (id) => {
    const toEdit = list.find((x) => x.id === id);
    if (toEdit) {
      setItem(toEdit.text);
      setList(list.filter((x) => x.id !== id));
    }
  };

  const setCompleted = (id) => {
    setList(list.map((item) =>
      item.id === id ? { ...item, completed: true } : item
    ));
  };

  useEffect(() => {
    if (isInitialized)
      localStorage.setItem("todolist", JSON.stringify(list));
  }, [list, isInitialized]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 600);
    const saved = localStorage.getItem("todolist");
    if (saved) setList(JSON.parse(saved));
    setInitialized(true);
  }, []);

  const filteredList = list.filter((item) => {
    if (filter === "completed") return item.completed;
    if (filter === "pending") return !item.completed;
    return true;
  });

  const getOrderedList = (order) => {
    return [...filteredList].sort((a, b) => {
      if (order === "sort") return a.text.localeCompare(b.text);
      else if (order === "reverse") return b.text.localeCompare(a.text);
      return 0;
    });
  };
  const sortedList = getOrderedList(order);
  const total = list.length;
  const completed = list.filter((x) => x.completed).length;
  const pending = total - completed;

  return (
    <div className="min-h-screen bg-gradient-to-r from-zinc-50 via-blue-50 to-zinc-200 flex flex-col">
      <header className="bg-white shadow mb-6">
        <div className="max-w-2xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-700 tracking-tight">
            To-Do List
          </span>
          <span className="text-sm text-zinc-500 font-medium">
            {new Date().toLocaleDateString()}
          </span>
        </div>
      </header>

      <main className="flex-1 flex justify-center items-start">
        <div className="w-full max-w-2xl mx-auto px-4">

          <section className="bg-white shadow-xl ring-1 ring-blue-100 rounded-2xl p-6">
            <h1 className="text-xl font-semibold mb-6 text-blue-700">
              Task Manager
            </h1>

            <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
              <div className="flex gap-2">
                <button
                  className={`${COLORS.button} ${filter === "all" ? COLORS.accent : COLORS.gray}`}
                  onClick={() => setFilter("all")}
                >
                  All <span className="font-bold">({total})</span>
                </button>
                <button
                  className={`${COLORS.button} ${filter === "completed" ? COLORS.accent : COLORS.gray}`}
                  onClick={() => setFilter("completed")}
                >
                  Done <span className="font-bold">({completed})</span>
                </button>
                <button
                  className={`${COLORS.button} ${filter === "pending" ? COLORS.accent : COLORS.gray}`}
                  onClick={() => setFilter("pending")}
                >
                  Pending <span className="font-bold">({pending})</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="order" className="text-zinc-700 text-sm">
                  Sort by
                </label>
                <select
                  id="order"
                  value={order}
                  onChange={e => setSortOrder(e.target.value)}
                  className="border border-zinc-200 rounded-lg px-2 py-1 text-sm focus:outline-blue-500"
                >
                  <option value="sort">A-Z</option>
                  <option value="reverse">Z-A</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>

            <form
              onSubmit={submitHandler}
              className="flex gap-3 mb-4"
            >
              <input
                type="text"
                name="item"
                value={item}
                autoComplete="off"
                placeholder="Add a new task…"
                maxLength={60}
                onChange={e => setItem(e.target.value)}
                className="flex-1 border border-zinc-300 rounded-lg px-4 py-2 focus:outline-blue-500"
              />
              <button
                type="submit"
                className={`${COLORS.button} ${COLORS.accent} shadow-md`}
                disabled={!item.trim()}
              >
                <span className="hidden sm:inline">Add</span>
                <span className="sm:hidden">+</span>
              </button>
            </form>

            <button
              onClick={() =>
                window.confirm("Are you sure you want to clear all tasks?") && setList([])
              }
              disabled={list.length === 0}
              className={`${COLORS.button} ${COLORS.danger} mb-6 w-full`}
            >
              Clear All
            </button>

            <div className="divide-y divide-blue-50">
              {!loading ? (
                sortedList && sortedList.length > 0 ? (
                  sortedList.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center py-3 group"
                    >
                      <span
                        className={`flex-1 text-base select-none ${
                          item.completed
                            ? COLORS.completed
                            : "text-zinc-800 font-medium"
                        }`}
                      >
                        {item.text}
                      </span>
                      <div className="flex gap-2 ml-2">
                        <button
                          title="Mark done"
                          className={`${COLORS.button} ${COLORS.accent}`}
                          onClick={() => setCompleted(item.id)}
                          disabled={item.completed}
                        >
                          {CheckIcon}
                        </button>
                        <button
                          title="Edit"
                          className={`${COLORS.button} ${COLORS.gray}`}
                          onClick={() => editItem(item.id)}
                          disabled={item.completed}
                        >
                          {EditIcon}
                        </button>
                        <button
                          title="Delete"
                          className={`${COLORS.button} ${COLORS.danger}`}
                          onClick={() =>
                            window.confirm("Delete this task?") && deleteItem(item.id)
                          }
                        >
                          {TrashIcon}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-zinc-400 py-10">No tasks for selected filter.</p>
                )
              ) : (
                <div className="flex justify-center items-center py-12">
                  <svg className="animate-spin mr-2 h-6 w-6 text-blue-400" fill="none"
                    viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10"
                      stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  <span className="text-blue-700 font-semibold">Loading...</span>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TodoList;
