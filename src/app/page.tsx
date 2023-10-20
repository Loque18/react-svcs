"use client";
import React, { useState, useEffect, useContext } from "react";

import { Todo } from "@/shared/todo.type";
import ThemeService from "@/shared/services/theme/theme.service";
import ThemeSvcContext from "@/shared/services/theme/theme.context";
import { Theme } from "@/shared/services/theme/theme.type";

function Todo() {
  // *~~*~~*~~ Theme svc ~~*~~*~~* //

  const themeSvc = useContext<ThemeService>(ThemeSvcContext);

  function toggleTheme() {
    themeSvc.toggleTheme();

    setTheme(themeSvc.theme);
  }

  const [theme, setTheme] = useState<Theme>(themeSvc.theme);

  // *~~*~~*~~ State ~~*~~*~~* //

  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");

  // Load todos from local storage on initial render
  useEffect(() => {
    const storedTodos = JSON.parse(
      localStorage.getItem("todos") || "[]"
    ) as Todo[];
    setTodos(storedTodos);
  }, []);

  // Save todos to local storage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input) {
      setTodos([...todos, { id: todos.length, text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleTodo = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="p-4 dark:text-white">
      {/* title */}

      <div className="flex gap-x-4 items-center mb-4">
        <h1 className="text-2xl font-semibold ">Todo App</h1>
        <button onClick={toggleTheme}>
          <i className={`fas ${theme === "light" ? "fa-sun" : "fa-moon"}`}></i>
        </button>
      </div>

      {/* input */}
      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-grow border rounded py-2 px-3 dark:bg-gray-700 dark:text-white"
          placeholder="Add a new task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={addTodo}
        >
          Add
        </button>
      </div>

      {/* todos */}
      <div className="mt-4 space-y-2">
        {todos.map((todo, index) => (
          <div
            key={index}
            className={`flex justify-between items-center  p-2 rounded-md ${
              todo.completed
                ? "bg-green-100 dark:bg-green-900"
                : "bg-gray-100 dark:bg-gray-700"
            }`}
          >
            <div>{todo.text}</div>

            <div className="flex gap-x-4">
              <button
                className="text-green-600 hover:text-green-800"
                onClick={() => toggleTodo(index)}
              >
                {/* check mark */}
                <i className="fas fa-check"></i>
              </button>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => deleteTodo(index)}
              >
                {/* trash can */}
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
