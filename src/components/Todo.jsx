import { useState } from "react";
// import { TaskList } from "./TaskList";
// import { DEL_ICON } from "../constants/images";
import { DEL_ICON } from "../constants/images";
function Todo() {
  const [task, setTask] = useState([]);

  const [subject, setSubject] = useState("");
  const [hours, setHours] = useState("");

  const handleTask = () => {
    if (!subject || !hours) {
      // if subject or hours is empty
      return;
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
  };

  return (
    <div className="flex flex-col justify-center items-center mt-24">
      <h1 className="text-5xl font-bold text-[#29B475]">
        Geekster Education Planner
      </h1>
      <div className="flex gap-4 mt-10">
        <input
          className="p-2 border-black border-2 rounded"
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
          <div className="flex justify-between w-[530px] mt-5" key={index}>
            <div className="flex gap-2 text-xl">
              <span className="font-bold">{tasks.subject}</span>
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
                className="text-3xl w-8 hover:bg-red-500 hover:rounded-lg"
                onClick={() => handleDelete(index)}
              >
                {DEL_ICON}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Todo;
