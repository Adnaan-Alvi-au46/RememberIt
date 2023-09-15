import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
      // {
      //   id: "e2",
      //   title: "Study well",
      //   description:'complete react query',
      //   time:"17:42",
      //   date: "2023-09-14",
      //   alerted:true
      // },
      // {
      //   id: "e3",
      //   title: "Hello",
      //   description:'Hello world',
      //   time:"17:41",
      //   date: "2023-09-15",
      //   alerted:false
      // },
      // {
      //   id: "e4",
      //   title: "Client",
      //   description:'client meeting',
      //   time:"13:01",
      //   date: "2023-09-16",
      //   alerted:true
      // },
      // {
      //   id: "e5",
      //   title: "lunch",
      //   description:'Lunch with parents',
      //   time:"13:01",
      //   date: "2023-09-16",
      //   alerted:false
      // },
      // {
      //   id: "e6",
      //   title: "lunch",
      //   description:'Lunch with parents',
      //   time:"13:01",
      //   date: "2023-09-17",
      //   alerted:false
      // },

    ],

  editMode: [],

  boolean: true,
};
const reminderSlice = createSlice({
  name: "reminder",
  initialState,
  reducers: {
    addReminder: (state, action) => {
      state.tasks.unshift(action.payload);
      localStorage.setItem('tasks',JSON.stringify(state.tasks))

    },
    deleteReminder: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem('tasks',JSON.stringify(state.tasks))

    },
    toggleForm: (state) => {
      // state.boolean = !state.boolean;
      state.editMode = [];
    },
    resetForm:(state)=>{  
      state.editMode = []
    },

    editReminder: (state, action) => {
      state.editMode = state.tasks.filter((task) => task.id === action.payload);
    },
    submitEdit: (state, action) => {
      const editedItemIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      // console.log(editedItemIndex);

      if (editedItemIndex !== -1) {
        // If the item with the given id is found
        state.tasks[editedItemIndex] = action.payload;
      localStorage.setItem('tasks',JSON.stringify(state.tasks))

      }

      // state.editMode = [action.payload];

      state.editMode = [];
    },
    setAlerted:(state,action)=>{
      // console.log("alerted",action.payload)
      const item = state.tasks.find((task)=>task.id === action.payload)
      if(item){
        item.alerted = true
      // localStorage.setItem('tasks',JSON.stringify(item))
        // item.count= item?.count-1
      }
    },
    setTasks:(state,action)=>{
      state.tasks = action.payload
    }
  },
});

export const {
  addReminder,
  deleteReminder,
  toggleForm,
  editReminder,
  submitEdit,
  resetForm,
  setAlerted,
  setTasks
} = reminderSlice.actions;

export default reminderSlice.reducer;
