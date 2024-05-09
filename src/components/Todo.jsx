import { useEffect, useState } from "react";
// import { TaskList } from "./TaskList";
// import { DEL_ICON } from "../constants/images";
import { DEL_ICON } from "../constants/images";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const getItemFromLocalStorage = () => {
  let data = localStorage.getItem("tasks");

  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

function Todo() {
  const [task, setTask] = useState(getItemFromLocalStorage());

  const [subject, setSubject] = useState("");
  const [hours, setHours] = useState("");

  const handleTask = () => {
    if (!subject || !hours) {
      // if subject or hours is empty
      toast.warn("Fill all the fields", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (subject !== "" && hours !== "") {
      toast.success("Task added successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    const reqObj = {
      subject,
      hours,
    };

    setTask([...task, reqObj]); // take previous tasks and add new task

    setSubject("");
    setHours("");

    console.log(subject, hours);
  };

  const increment = (key) => {
    let updatedHours = [...task];
    updatedHours[key].hours++;
    setTask(updatedHours);
  };

  const decrement = (key) => {
    if (task[key].hours === 0) return;
    let updatedHours = [...task];
    updatedHours[key].hours--;
    setTask(updatedHours);
  };

  const handleDelete = (key) => {
    let updatedTask = task.filter((task, index) => index !== key);
    setTask(updatedTask);
    toast.success("Task deleted successfully", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    let addData = localStorage.setItem("tasks", JSON.stringify(task));
    console.log(addData);
  }, [task]);

  return (
    <div className="flex flex-col justify-center items-center mt-24">
      <h1 className="text-5xl font-bold text-[#29B475]">
        Geekster Education Planner
      </h1>
      <div className="flex gap-4 mt-10">
        <input
          className="p-3 border-black border-2 rounded"
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          className="p-2 border-black border-2 rounded"
          type="number"
          placeholder="Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
        <button
          onClick={handleTask}
          className="p-2 border-black border-2 rounded w-28 hover:bg-[#29B475] hover:text-white hover:border-0"
        >
          Add
        </button>
      </div>

      <div>
        {task.map((tasks, index) => (
          <div
            className="flex justify-between w-[530px] mt-7 bg-[#29B475] text-white p-2 rounded-lg hover:bg-[#fff] hover:text-[#000] hover:border-2  hover:border-[#29B475] hover:cursor-pointer transition-all ease-in-out"
            key={index}
          >
            <div className="flex gap-2 text-xl">
              <span className="font-bold ml-3">{tasks.subject}</span>
              <span> - </span>
              <span>{tasks.hours} Hours</span>
            </div>

            <div className="flex gap-6">
              <button
                className="text-3xl w-8 hover:bg-[#29B475] hover:text-[#fff] hover:rounded-lg"
                onClick={() => increment(index)}
              >
                +
              </button>
              <button
                className="text-3xl w-8 hover:bg-red-500 hover:text-[#fff] hover:rounded-lg"
                type="button"
                onClick={() => decrement(index)}
              >
                -
              </button>
              <button
                className="text-3xl w-8 hover:bg-red-500 hover:rounded-lg text-[#fff]"
                onClick={() => handleDelete(index)}
              >
                {DEL_ICON}
              </button>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}
export default Todo;
