import React from "react";
import classes from "./ReminderList.module.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import {
  deleteReminder,
  editReminder,
  toggleForm,
} from "../../features/reminder/reminderSlice";

const ReminderList = () => {
  const reminderData = useSelector((state) => state.reminder.tasks);
  const formOpen = useSelector((state) => state.reminder.boolean);

  const dispatch = useDispatch();

  const handleDelete = (itemId) => {
    dispatch(deleteReminder(itemId));
  };
  const handleEdit = (itemId) => {
    if (!formOpen) dispatch(toggleForm());
    dispatch(editReminder(itemId));
  };
  // console.log("reminderData", reminderData)
  return (
    <div className={classes["list-container"]}>
      <ul>
        {!reminderData.length ? (
          <h2 className={classes.item} style={{color:'white'}} >Set Your Reminder</h2>
        ) : (
          reminderData.map((item) => {
            const itemClasses = [classes.item];
            if (item.alerted) {
              itemClasses.push(classes.alertedItem);
            }
            // console.log(itemClasses)
            // console.log(itemClasses.join(""))
            return (
              <li key={item.id} className={itemClasses.join(" ")}>
                <div className={classes["list-item"]}>
                  <h5 className={classes["time-date"]}>{item.time}</h5>
                  <h5 className={classes["time-date"]}>{item.date}</h5>
                  <h3>{item.title}</h3>
                  <h5>{item.description}</h5>
                </div>
                  <div className={classes['list-button']}>
                  {/* <div className={classes.completed}>completed</div> */}
                  {item.alerted && <div className={classes.completed}>completed</div>}
                {!item.alerted && (
                    <h6 className={classes["button-div"]}>
                      <button
                        className={`${classes["edit-btn"]} ${classes.btn}`}
                        onClick={() => handleEdit(item.id)}
                      >
                        edit
                      </button>
                      <button
                        className={`${classes["delete-btn"]} ${classes.btn}`}
                        onClick={() => handleDelete(item.id)}
                      >
                        X
                      </button>
                    </h6>
                    )}
                  </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default ReminderList;
