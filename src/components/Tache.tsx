import React from "react";
import { Todo } from "../models/todo";

interface TacheProps{
    todo : Todo;
    onToggleCOmplete : (id : number)  => void;
    onDelete: (id : number) => void;
}