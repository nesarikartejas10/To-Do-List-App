import React, { useEffect, useState } from "react";

const getLocalData = () => {
  let list = localStorage.getItem("todos");
  if (list) {
    return JSON.parse(localStorage.getItem("todos"));
  } else {
    return [];
  }
};

const Todos = () => {
  const [taskInput, setTaskInput] = useState("");
  const [data, setData] = useState(getLocalData());
  const [isEdit, setIsEdit] = useState(true);
  const [editTaskId, setEditTaskId] = useState(null);

  function handleTaskInput(e) {
    setTaskInput(e.target.value);
  }

  function addTask() {
    if (taskInput.trim() === "" || taskInput === "") {
      alert("Please Enter Task!...");
    } else if (taskInput && !isEdit) {
      setData(
        data.map((todo) => {
          if (todo.id === editTaskId) {
            return { ...todo, name: taskInput };
          }
          return todo;
        })
      );
    } else {
      const allInputTask = { id: crypto.randomUUID(), name: taskInput };
      setData((prevData) => [...prevData, allInputTask]);
      setTaskInput("");
    }
  }

  function deleteTask(index) {
    let filterTask = data.filter((todo) => index !== todo.id);
    setData(filterTask);
  }

  function editTask(id) {
    let newEditTask = data.find((todo) => id === todo.id);
    setIsEdit((prevToggle) => !prevToggle);
    setTaskInput(newEditTask.name);
    setEditTaskId(newEditTask.id);
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(data));
  }, [data]);

  return (
    <>
      <div className="container">
        <div className="inputTask">
          <input
            type="text"
            placeholder="Enter your task..."
            value={taskInput}
            onChange={handleTaskInput}
          />
          <button onClick={addTask}>{isEdit ? "Add" : "Edit"}</button>
        </div>
        {data.length > 0 ? (
          data.map((todo) => {
            return (
              <div key={todo.id} className="taskData">
                <p>{todo.name}</p>
                <div className="icons">
                  <i
                    onClick={() => editTask(todo.id)}
                    className="fa-solid fa-pen-to-square"
                    id="editIcon"
                  ></i>
                  <i
                    onClick={() => deleteTask(todo.id)}
                    className="fa-solid fa-trash"
                    id="deleteIcon"
                  ></i>
                </div>
              </div>
            );
          })
        ) : (
          <p className="msg">No task is available!...</p>
        )}
      </div>
    </>
  );
};

export default Todos;
