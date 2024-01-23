
"use client"
import Image from "next/image";
import {child, get, ref } from 'firebase/database';
import { db } from "@/firebase";
import TaskCard from "./components/TaskCard";
import { useState, useEffect } from "react";


export default function Home() {
  const [tasksList, setTasksList] = useState({
    "todo": {},
    "in_progress": {},
    "completed": {}
  });

  const getTasksList = () => {
    get(child(ref(db), `tasks`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        const data = snapshot.val();
        const filtered_data = {
          "todo": {},
          "in_progress": {},
          "completed": {}
        }
        Object.keys(data).forEach(key => {
          const item = data[key];
          filtered_data[item['status']][key] = item;
        })
        console.log(filtered_data);
        setTasksList(filtered_data);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    getTasksList();

  }, [])


  return (
    <main>
        <div className="d-flex">
          <div className="col-3 mx-3">
            <div className="bg-primary px-3 py-2 rounded">TODO</div>
            <div>
              {Object.keys(tasksList["todo"]).map(key => {
                return <TaskCard key={key} props={{...tasksList["todo"][key], ['key']: key}}></TaskCard>
              })}
            </div>
          </div>

          <div className="col-3 mx-3">
            <div className="bg-warning px-3 py-2 rounded">IN Progress</div>
            <div>
            {Object.keys(tasksList["in_progress"]).map(key => {
                return <TaskCard key={key} props={{...tasksList["in_progress"][key], ['key']: key}}></TaskCard>
              })}
            </div>
          </div>

          <div className="col-3 mx-3">
            <div className="bg-success px-3 py-2 rounded">Completed</div>
            <div>
            {Object.keys(tasksList["completed"]).map(key => {
                return <TaskCard key={key} props={{...tasksList["completed"][key], ['key']: key}}></TaskCard>
              })}
            </div>
          </div>
          <div className="col-3 mx-3">
            <a href={"tasks/create"} className="btn btn-dark rounded"> Create New Task</a>

          </div>

          
        </div>  
    </main>
  );
}
