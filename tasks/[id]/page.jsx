"use client"
import { v4 as UUidv4 } from "UUid";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { child, get, set, ref, remove } from "firebase/database";

export default function ViewUpdateDeletePage({ params }){
    const [usersList, setUsersList] = useState([]);
    const [formData, setFormData] = useState({
        title: null,
        description: null,
        status: null,
        assigned_user: null,
        deadline: null

    });

    const getUserList = () => {
        get(child(ref(db), `users`)).then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              const data = snapshot.val();
              setUsersList(Object.values(data));
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
    };

    const getTaskDetails = () => {

        get(child(ref(db), `tasks/${params.id}`)).then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              const data = snapshot.val();
              
              setFormData(data);
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });


    }


    useEffect(() => {
        getUserList();
        getTaskDetails();

    }, [])

        const handleChange =(e) => {
            setFormData({...formData, [e.target.name]: e.target.value})
            console.log(formData);
        }


        const handleSubmit = (e) =>{
            e.preventDefault();

            const taskID = UUidv4();
            set(ref(db, `tasks/${params.id}`), formData);
            window.alert("Updated Details");

        }

        const handleDelete = (e) => {

            remove(ref(db, "tasks/" +params.id));
            console.log("Deleted Task");
        }


    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputTitle1" className="form-label">Title</label>
                <input type="text" className="form-control" id="exampleInputTitle1" name="title" onChange={handleChange} value={formData.title} />
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputDescription1" className="form-label">Description</label>
                <textarea className="form-control" id="exampleInputDesciption1" rows={6} name ="description" onChange={handleChange} value={formData.description}></textarea>
            </div>

            <div className="d-flex">
                
            <div className="mb-3 col-3 me-3">
                <label htmlFor="status" className="form-label">Status</label>
            <select name ="status" className="form-select" aria-label="Default select example" onChange={handleChange} value={formData.status}>
                <option selected>Select Status</option>
                <option value="todo">TODO</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
            </div>

            <div className="mb-3 col-3 me-3">
                <label htmlFor="assigned_user" className="form-label">Assigned User</label>
            <select name ="assigned_user" className="form-select" aria-label="Default select example" onChange={handleChange} value={formData.assigned_user}>
                <option selected>Select User</option>
                {usersList.map((item) => {
                    return (
                        <option key = {item.id} value={item.id}>
                           { `${item.username} <${item.email}>`}
                        </option>
                    )
                })}
            </select>
            </div>

            <div className="mb-3 col-3 me-3">
                <label htmlFor="deadline" className="form-label">DeadLine</label>
                <input type="date" className="form-control" name="deadline"  value={formData.deadline} onChange={handleChange} id="deadline" min={new Date().toISOString().split("T")[0]}/>
            </div>

            </div>


            <div className="d-flex mt-3">
            <button type="submit" className="btn btn-success">Update Task</button>
            <button type="submit" className="btn btn-danger mx-3" onClick= {handleDelete}>Delete Task</button>
            </div>
            </form>
        </div>
    )
}