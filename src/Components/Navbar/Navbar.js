// import { toggleForm } from "../../features/reminder/reminderSlice";
import classes from "./Navbar.module.css";
// import { useDispatch } from "react-redux";
const Navbar = (props) => {

  // const dispatch = useDispatch()

  const toggleFormHandler = () =>{
    // dispatch(toggleForm())
  }
  
  return (
    <div className={classes["nav-container"]}>
      <div className={classes["btn-container"]}>
        <div className={classes.btn} onClick={toggleFormHandler} > RememberIt</div>
      </div>
    </div>
  );
};

export default Navbar;
