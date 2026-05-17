import { useEffect, useState } from "react";
import {v4 as uuidv4} from "uuid";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskContent, setNewTaskContent] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if(savedTasks){
        setTasks(savedTasks)
    }
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const handleAddTasks = () => {
    const newTask = {
      id: uuidv4(),
      text: newTaskContent,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskContent("");
    saveToLocalStorage();
  };

  const handleEdit = (id) => {
    const edittedTaskArray = tasks.filter((item) => {
      if (item.id == id) {
        return setNewTaskContent(item.text);
      }
      return item.id !== id;
    });
    setTasks(edittedTaskArray)
    saveToLocalStorage()
  };

  const handleDelete = (id)=>{
    const deletedTaskArrayy = tasks.filter(item=> item.id !== id)
    setTasks(deletedTaskArrayy)
    saveToLocalStorage()
  }

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const handledTasks = tasks.map((item) => {
      if (item.id == id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    setTasks(handledTasks);
    saveToLocalStorage();
  };

  return (
    <div className="bg-black min-h-screen text-green-400">
      <div className="w-[50vw] border mx-auto py-5 text-center">
        <h1 className="text-3xl mb-2">Add Tasks</h1>
        <div className="flex gap-2 justify-center">
          <input
            className="w-[40vw] bg-gray-300 placeholder:text-black text-black rounded-xl h-10 px-3 focus:outline-0"
            type="text"
            name="task"
            id="task"
            placeholder="Add new Task"
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
          />
          <button
            className="h-10 bg-green-400 text-white px-10 rounded-xl"
            onClick={handleAddTasks}
          >
            Add
          </button>
        </div>
      </div>
      <div className="my-5 p-3 border w-[50vw] mx-auto h-[30vw] flex flex-col gap-3 overflow-y-auto">
        {tasks.map((item) => {
          return (
            <div
              key={item.id}
              className="flex justify-start gap-10 items-center"
            >
              <div className="flex gap-2 w-[20vw] justify-start items-center">
                <input
                  type="checkbox"
                  name={item.id}
                  id=""
                  onChange={handleCheckbox}
                  checked={item.isCompleted}
                />
                <p
                  className={`flex-wrap ${
                    item.isCompleted ? "line-through" : ""
                  }`}
                >
                  {item.text}
                </p>
              </div>
              <div className="flex ">
                <button
                  className="bg-green-300 text-black px-3 py-1 rounded-xl mr-3 cursor-pointer"
                  onClick={() => {
                    handleEdit(item.id);
                  }}
                >
                  Edit
                </button>
                <button className="bg-red-300 text-black px-3 py-1 rounded-xl cursor-pointer" onClick={() => {
                    handleDelete(item.id);
                  }}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
