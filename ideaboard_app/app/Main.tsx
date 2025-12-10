"use client"

import {useState} from "react";
import { Button, DatePicker } from 'antd';

export const Main = () => {
  const [ideas, setIdeas] = useState(["Idea 1", "Idea 2", "Idea 3"]);
  const newIdea = (idea) => {
    setIdeas((ideas) => [...ideas, idea])
  };

  return(
    <main className="min-h-[0] p-[8px] m-[8px] text-left flex flex-col flex-2 justify-start gap-(--flex-gap) border-2 border-solid rounded-(--border-radius) border-(--border)">
    <div className="flex justify-between">  
        <nav className="">
          <button className="navButton hover:bg-(--hover-background)">Beste Ideen</button>
          <button className="navButton hover:bg-(--hover-background)">Neue Ideen</button>
          <button className="navButton hover:bg-(--hover-background)">Projekte</button>
          <button className="navButton hover:bg-(--hover-background)">Umfragen</button>
          <Button type="primary">Button</Button>
        </nav>
        <div className="">
          <input></input>
          <button onClick={() => newIdea("Hallo")} className="navButton hover:bg-(--hover-background)">Idee erstellen</button>
        </div>
    </div>
      <div className="h-max p-[8px] m-[8px] text-left justify-start border-2 border-solid rounded-(--border-radius) border-(--border)">
      {ideas.map((idea, i)=><p key={i}>{idea}</p>)}
      </div>
    </main>
  );
};
