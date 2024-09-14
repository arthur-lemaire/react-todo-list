import React, { useState, useEffect } from "react";
import Tache from "./components/Tache"; // Importe le composant Tache
import { Todo } from "./models/todo";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // État pour gérer les tâches
  const [newTask, setNewTask] = useState<string>(""); // État pour la nouvelle tâche

  // Fonction pour ajouter une nouvelle tâche
  const addTodo = () => {
    if (newTask.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      task: newTask,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setNewTask(""); // Réinitialise l'entrée utilisateur
  };

  // Fonction pour basculer l'état "terminé/non terminé"
  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Fonction pour supprimer une tâche
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleFileChange = (id: number, file: File | undefined) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, file } : todo)));
  };

  // Sauvegarde dans localStorage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    if (savedTodos.length > 0) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="bg-gray-100 p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="flex">
        <input
          className="border p-2 flex-grow"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Ajouter une tâche"
        />
        <button className="bg-blue-500 text-white p-2 ml-2" onClick={addTodo}>
          Ajouter
        </button>
      </div>

      <ul className="mt-4">
        {todos.map((todo) => (
          <Tache
            key={todo.id}
            todo={todo}
            onToggleComplete={toggleComplete}
            onDelete={deleteTodo}
            onFileUpload={handleFileChange}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
