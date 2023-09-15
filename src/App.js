import { useEffect } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import ReminderForm from "./Components/SetReminder/ReminderForm";
import ReminderList from "./Components/SetReminder/ReminderList";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "./features/reminder/reminderSlice";

const App = () => {
  // const boolean = useSelector((state) => state.reminder.boolean);
  const state = useSelector((state) => state.reminder.tasks);
  console.log('state', state)
  const dispatch = useDispatch()

  useEffect(()=>{
    const storedData = JSON.parse(localStorage.getItem('tasks')) || [];
    dispatch(setTasks(storedData))
  },[dispatch])

  return (
    <>
      <Navbar />
      <div className="app-body">
        <ReminderList />
         <ReminderForm />
      </div>
    </>
  );
};

export default App;
