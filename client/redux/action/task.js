import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { baseUrl } from "./auth";


export const addTask = createAsyncThunk("addTask", async ({ title, description }) => {
    try {
        const response = await axios.post(`${baseUrl}/tasks/add-task`, { title, description }, {
            headers: {
                "Content-Type": "application/json",
            }
        })

        return response.data

    } catch (error) {
        console.log(error);
        throw error.response.data.message;

    }

});


export const updateTask = createAsyncThunk("updateTask", async (taskid) => {
    try {
        const response = await axios.put(`${baseUrl}/tasks/update-task/${taskid}`);

        return response.data;

    } catch (error) {
        console.log(error);
        throw error.response.data.message;
    }
});


export const deleteTask = createAsyncThunk("deleteTask", async (taskid) => {
    try {
        const response = await axios.delete(`${baseUrl}/tasks/remove-task/${taskid}`);

        return response.data;

    } catch (error) {
        console.log(error);
        throw error.response.data.message;
    }
});
