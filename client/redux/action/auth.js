import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const baseUrl = "http://192.168.0.101:5000/api"


export const login = createAsyncThunk("login", async ({ email, password }) => {

    try {
        const response = await axios.post(`${baseUrl}/users/login`, { email, password }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })

        return response.data;

    } catch (error) {
        console.error(error);
        throw error.response.data.message;
    }

});

export const register = createAsyncThunk("register", async (formData) => {
    try {
        const response = await axios.post(`${baseUrl}/users/register`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }

        })

        return response.data;

    } catch (error) {
        console.log(error);
        throw error.response.data.message

    }
})


export const getMyProfile = createAsyncThunk("getMyProfile", async () => {

    try {

        const response = await axios.get(`${baseUrl}/users/myprofile`)

        return response.data;

    } catch (error) {
        console.log(error);
        throw error.response.data.message;
    }

});


export const updateProfile = createAsyncThunk("updateProfile", async (formData) => {
    try {
        const response = await axios.put(`${baseUrl}/users/updateprofile`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        return response.data;

    } catch (error) {
        console.error(error);
        throw error.response.data.message

    }
})


export const changePassword = createAsyncThunk("changePassword", async ({ oldPassword, newPassword }) => {
    try {
        const response = await axios.put(`${baseUrl}/users/updatepassword`, { oldPassword, newPassword }, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        return response.data;

    } catch (error) {
        console.log(error)
        throw error.response.data.message

    }
})

export const logout = createAsyncThunk("logout", async () => {
    try {

        const response = await axios.get(`${baseUrl}/users/logout`)
        return response.data;

    } catch (error) {
        console.log(error);
        throw error.response.data.message

    }
})


export const verifyAccount = createAsyncThunk('verifyaccount', async (otp) => {
    try {
        const response = await axios.post(`${baseUrl}/users/verify`, { otp }, {
            headers: "application/json"
        });

        return response.data;

    } catch (error) {
        console.log(error);
        throw error.response.data.message

    }
})


export const forgetPassword = createAsyncThunk('forget-password', async (email) => {
    try {
        const response = await axios.post(`${baseUrl}/users/forgotpassword`, { email }, {
            headers: "application/json"
        });

        return response.data;

    } catch (error) {
        console.log(error);
        throw error.response.data.message

    }
})


export const resetPassword = createAsyncThunk('reset-password', async ({ otp, password }) => {
    try {
        const response = await axios.put(`${baseUrl}/users/resetpassword`, { otp, password }, {
            headers: "application/json"
        });

        return response.data;

    } catch (error) {
        console.log(error);
        throw error.response.data.message

    }
})