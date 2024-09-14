import React, { useState } from "react";
import { Todo } from "../models/todo";

interface TacheProps {
  todo: Todo;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onFileUpload: (id: number, file: File | undefined) => void;
}

const Tache: React.FC<TacheProps> = ({
  todo,
  onToggleComplete,
  onDelete,
  onFileUpload,
}) => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : undefined;
    setFile(selectedFile);
    onFileUpload(todo.id, selectedFile);
  };

  return (
    <li className="flex items-center justify-between p-2">
      <span
        className={`flex-grow ${
          todo.completed ? "line-through text-gray-400" : ""
        }`}
      >
        {todo.task}
      </span>
      <button
        className="bg-green-500 text-white p-1 mr-2"
        onClick={() => onToggleComplete(todo.id)}
      >
        {todo.completed ? "Annuler" : "Terminer"}
      </button>
      <button
        className="bg-red-500 text-white p-1"
        onClick={() => onDelete(todo.id)}
      >
        Supprimer
      </button>
      <div>
        <input type="file" onChange={handleFileChange} />
        {todo.file && <p>Fichier : {todo.file.name}</p>}
      </div>
    </li>
  );
};

export default Tache;
