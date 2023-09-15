// // // import  "./Card.css"

// // // function Card(props){
// // //     const classes = 'card ' + props.className;
// // //     return<div className={classes}>{props.children}</div>
// // // }

// // // export default Card

// // import React, { useEffect, useState } from "react";
// // import classes from "./ReminderForm.module.css";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useFormik } from "formik";
// // import * as Yup from "yup";
// // import moment from "moment";
// // import {
// //   resetForm,
// //   setAlerted,
// //   submitEdit,
// //   toggleForm,
// // } from "../../features/reminder/reminderSlice";
// // import { addReminder } from "../../features/reminder/reminderSlice";
// // import BarChart from "../Chart/BarChart";
// // import { Snackbar } from "@mui/material";
// // import { CategoryScale } from "chart.js";
// // import { CategoryAxis } from "chart.js";
// // import Chart from "chart.js/auto";

// // // Chart.register(CategoryScale);
// // // Chart.register(CategoryAxis);

// // const ReminderForm = (props) => {
// //   const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
// //   const [snackbarMessage, setSnackbarMessage] = useState("");

// //   const isEdit = useSelector((state) => state.reminder.editMode.length > 0);
// //   const beingEdited = useSelector((state) => state.reminder.editMode);
// //   const chartData = useSelector((state) => state.reminder.tasks);
// //   // console.log("beingEdited", beingEdited);
// //   const dispatch = useDispatch();

// //   function countDates(data) {
// //     // console.log("data", data);

// //     let filteredData;

// //     filteredData = data.filter((item) => !item.alerted);
// //     // console.log("filteredData", filteredData);

// //     const dateCount = {};

// //     // Iterate through the chartData array and count occurrences of each date
// //     for (const item of filteredData) {
// //       const date = item.date;
// //       dateCount[date] = (dateCount[date] || 0) + 1;
// //     }
// //     // Convert the dateCount object into an array of objects
// //     const dateCountArray = Object.entries(dateCount).map(([date, count]) => ({
// //       date,
// //       count,
// //     }));

// //     dateCountArray.sort((a, b) => {
// //       return new Date(a.date) - new Date(b.date);
// //     });

// //     return dateCountArray;
// //   }

// //   const dateCountData = countDates(chartData);
// //   // console.log("dateCountData", dateCountData);

// //   const dates = dateCountData.map((data) => moment(data.date ,"YYYY-MM-DD").format("DD MMM YY"));
// //   const count = dateCountData.map((data) => data.count);
// //   const userData = {
// //     labels: dates,
// //     datasets: [
// //       {
// //         label: "Reminders",
// //         data: count,
// //         backgroundColor: [
// //           "rgba(75,192,192,1)",
// //           "#ecf0f1",
// //           "#50AF95",
// //           "#f3ba2f",
// //           "#2a71d0",
// //         ],
// //         borderColor: "black",
// //         borderWidth: 3,
// //       },
// //     ],
// //   };

// //   const formik = useFormik({
// //     initialValues: {
// //       title: "",
// //       time: "",
// //       description: "",
// //       date: "",
// //     },
// //     validationSchema: Yup.object({
// //       title: Yup.string().required("Required"),
// //       time: Yup.string().required("Required"),
// //       description: Yup.string().required("Required"),
// //       date:  Yup.date()
// //       .min(moment().format("YYYY-MM-DD"), "Date must be today or later") // Set min date validation
// //       .required("Required"),
// //     }),
// //     onSubmit: (values) => {
// //       // console.log("onSubmit", values);
// //       const reminderData = {
// //         id: beingEdited.length ? beingEdited[0].id : randomId,
// //         title: values.title,
// //         time: values.time,
// //         description: values.description,
// //         date: values.date,
// //         alerted: false,
// //       };
// //       // console.log(reminderData);
// //       if (beingEdited.length) {
// //         // If beingEdited is not empty, it means we're in edit mode
// //         // Update the existing reminder by dispatching the editReminder action
// //         dispatch(submitEdit(reminderData));
// //       } else {
// //         // If beingEdited is empty, it means we're adding a new reminder
// //         dispatch(addReminder(reminderData));
// //       }
// //       formik.resetForm();
// //       console.log('formik',reminderData)
// //       scheduleAlert(reminderData);
// //     },
// //   });

// //   useEffect(() => {
// //     beingEdited.length &&
// //       formik.setValues({
// //         title: beingEdited[0].title,
// //         time: beingEdited[0].time,
// //         description: beingEdited[0].description,
// //         date: beingEdited[0].date,
// //       });
// //   }, [beingEdited]);

// //   const toggleFormHandler = () => {
// //     formik.resetForm();
// //     dispatch(toggleForm());
// //   };

// //   const handleReset = () => {
// //     formik.resetForm();
// //     dispatch(resetForm());
// //   };

// //   function generateRandomId() {
// //     // Generate a random number between 10 and 99 (inclusive)
// //     const min = 10;
// //     const max = 99;
// //     return Math.floor(Math.random() * (max - min + 1)) + min;
// //   }
// //   const randomId = generateRandomId();

// //   const openSnackBar = (message) => {
// //     setSnackbarMessage(message);
// //     setIsSnackbarOpen(true);
// //   };

// //   const scheduleAlert = (reminderData) => {
// //     console.log('scheduleAlert',reminderData)
// //     const currentDateTime = moment();
// //     const selectedDateTime = moment(
// //       `${reminderData.date} ${reminderData.time}`,
// //       "DD-MMM-YY HH:mm"
// //     );
// //     console.log('currentDateTime',currentDateTime)
// //     console.log('selectedDateTime',selectedDateTime)

// //     if (!selectedDateTime.isValid()) {
// //       // alert("Invalid date or time format.");
// //       openSnackBar(`Alert : Invalid date or time format.`);
// //       return;
// //     }

// //     if (selectedDateTime.isSameOrBefore(currentDateTime)) {
// //       // alert("Selected date and time have already passed.");
// //       openSnackBar(`Alert : Selected date and time have already passed.`);
// //       return;
// //     }

// //     const dateTimeDifference = selectedDateTime.diff(currentDateTime);

// //     setTimeout(() => {
// //       // alert(`Reminder: ${reminderData.title}`);
// //       openSnackBar(
// //         `Reminder: ${reminderData.title} ${reminderData.description}`
// //       );
// //       dispatch(setAlerted(reminderData.id));
// //     }, dateTimeDifference);
// //   };

// //   return (
// //     <div className={classes["form-container"]}>
// //       <Snackbar
// //         anchorOrigin={{ vertical: "top", horizontal: "center" }}
// //         open={isSnackbarOpen}
// //         autoHideDuration={10000}
// //         onClose={() => setIsSnackbarOpen(false)}
// //         message={snackbarMessage}
// //       />
// //       <form onSubmit={formik.handleSubmit}>
// //         <div className={classes["form-control"]}>
// //           <label>Title</label>
// //           <input id="title" type="text" {...formik.getFieldProps("title")} />
// //           {formik.touched.title && formik.errors.title ? (
// //             <div className={classes.error}>{formik.errors.title}</div>
// //           ) : null}
// //         </div>

// //         <div className={classes["form-control"]}>
// //           <label>Description</label>
// //           <input
// //             id="description"
// //             type="text"
// //             {...formik.getFieldProps("description")}
// //           />
// //           {formik.touched.description && formik.errors.description ? (
// //             <div className={classes.error}>{formik.errors.description}</div>
// //           ) : null}
// //         </div>
// //         <div className={classes["form-control"]}>
// //           <label>Set Time</label>
// //           <input
// //             id="time"
// //             format="HH:mm"
// //             type="time"
// //             {...formik.getFieldProps("time")}
// //           />
// //           {formik.touched.time && formik.errors.time ? (
// //             <div className={classes.error}>{formik.errors.time}</div>
// //           ) : null}
// //         </div>
// //         <div className={classes["form-control"]}>
// //           <label>Set Date</label>
// //           <input
// //             id="date"
// //             type="date"
// //             onChange={formik.handleChange}
// //             onBlur={formik.handleBlur}
// //             value={formik.values.date}
// //             min={moment().format("YYYY-MM-DD")}
// //           />
// //           {formik.touched.date && formik.errors.date ? (
// //             <div className={classes.error}>{formik.errors.date}</div>
// //           ) : null}
// //         </div>
// //         <div className={classes["form-actions"]}>
// //           <button
// //             type="button"
// //             className={classes.btn}
// //             onClick={toggleFormHandler}
// //           >
// //             Cancel
// //           </button>
// //           <button type="submit" className={classes.btn}>
// //             {isEdit ? "Save" : "Submit"}
// //           </button>
// //           <button type="button" className={classes.btn} onClick={handleReset}>
// //             Reset
// //           </button>
// //         </div>
// //       </form>
// //       <BarChart chartData={userData} />
// //     </div>
// //   );
// // };

// // export default ReminderForm;



// import React from "react";
// import classes from "./ReminderList.module.css";
// import { useSelector } from "react-redux/es/hooks/useSelector";
// import { useDispatch } from "react-redux";
// import {
//   deleteReminder,
//   editReminder,
//   toggleForm,
// } from "../../features/reminder/reminderSlice";
// import moment from "moment";

// const ReminderList = () => {
//   const reminderData = useSelector((state) => state.reminder.tasks);
//   const formOpen = useSelector((state) => state.reminder.boolean);

//   const dispatch = useDispatch();

//   const handleDelete = (itemId) => {
//     dispatch(deleteReminder(itemId));
//   };
//   const handleEdit = (itemId) => {
//     if (!formOpen) dispatch(toggleForm());
//     dispatch(editReminder(itemId));
//   };
//   console.log("reminderData", reminderData);
//   return (
//     <div className={classes["list-container"]}>
//       <ul>
//         {!reminderData.length ? (
//           <h2>Set Your Reminder</h2>
//         ) : (
//           reminderData.map((item) => {
//             const itemClasses = [classes.item];
//             if (item.alerted) {
//               itemClasses.push(classes.alertedItem);
//             }
//             // console.log(itemClasses)
//         // console.log(itemClasses.join(""))

//             return (
//               <li key={item.id} className={itemClasses.join(" ")}>
//                 <h5>{item.time}</h5>
//                 <h5>{moment(item.date ,"YYYY-MM-DD").format("DD MMM YY")}</h5>
//                 <h3>{item.title}</h3>
//                 <h4>{item.description}</h4>
//                 {!item.alerted && <h6 className={classes["button-div"]}>
//                   <button
//                     className={`${classes["edit-btn"]} ${classes.btn}`}
//                     onClick={() => handleEdit(item.id)}
//                   >
//                     edit
//                   </button>
//                   <button
//                     className={`${classes["delete-btn"]} ${classes.btn}`}
//                     onClick={() => handleDelete(item.id)}
//                   >
//                     X
//                   </button>
//                 </h6>}
//               </li>
//             );
//           })
//         )}
//       </ul>
//     </div>
//   );
// };

// export default ReminderList;
