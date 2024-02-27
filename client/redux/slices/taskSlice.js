import { createSlice } from "@reduxjs/toolkit";
import { addTask, updateTask, deleteTask } from "../action/task";

const tasks = createSlice({
    name: "task",
    initialState: {
        tasksadd: null,
        tasksLoading: false,
        tasksError: null,


        updateTaskLoading: false,
        updateTask: null,
        updateTaskError: null,

        taskDelete: null,
        taskDeleteLoading: false,
        taskDeleteError: null

    },
    reducers: {
        clearUpdateTask: (state) => {
            state.updateTask = null

        },
        clearDeleteTask: (state) => {
            state.taskDelete = null
        },

    },

    extraReducers: (builder) => {

        builder.addCase(addTask.pending, (state) => {
            state.tasksLoading = true;
        });

        builder.addCase(addTask.fulfilled, (state, action) => {
            state.tasksLoading = false;
            state.tasksadd = action.payload;

        });

        builder.addCase(addTask.rejected, (state, action) => {
            state.tasksLoading = false;
            state.tasksError = action.error.message;
        });





        builder.addCase(updateTask.pending, (state) => {
            state.updateTaskLoading = true;
        });

        builder.addCase(updateTask.fulfilled, (state, action) => {
            state.updateTaskLoading = false;
            state.updateTask = action.payload;
        });
        builder.addCase(updateTask.rejected, (state, action) => {
            state.updateTaskLoading = false;
            state.updateTaskError = action.error.message;
        });




        builder.addCase(deleteTask.pending, (state) => {
            state.taskDeleteLoading = true;
        });

        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.taskDeleteLoading = false;
            state.taskDelete = action.payload;
        });
        builder.addCase(deleteTask.rejected, (state, action) => {
            state.taskDeleteLoading = false;
            state.taskDeleteError = action.error.message;
        });
    }
})


export const { clearDeleteTask, clearUpdateTask } = tasks.actions;


export const taskReducer = tasks.reducer;