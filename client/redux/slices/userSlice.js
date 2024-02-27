import { createSlice } from "@reduxjs/toolkit";
import {
    login, getMyProfile, updateProfile,
    changePassword, logout, register, verifyAccount, forgetPassword, resetPassword
} from "../action/auth";


const auth = createSlice({
    name: "auth",
    initialState: {
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: null,

        loadUserError: null,

        dataProfileUpdate: null,
        errorProfileUpdate: null,
        loadingProfileUpdate: false,

        dataRegister: null,
        errorRegister: null,

        dataChangePassword: null,
        loadingChangePassword: false,
        errorChangePassword: null,



        dataLogout: null,
        loadingLogout: false,
        errorLogout: null,


        dataVerify: null,
        loadingVerify: false,
        errorVerify: null,

        dataForgotPassword: null,
        loadingForgotPassword: false,
        errorForgotPassword: null,

        dataResetPassword: null,
        errorResetPassword: null,
        loadingResetPassword: false,

    },
    reducers: {
        clearUpdateProfile: (state) => {
            state.dataProfileUpdate = null
        },
        clearPasswordChange: (state) => {
            state.dataChangePassword = null;
            state.errorChangePassword = null;
        },
        clearRegister: (state) => {
            state.dataRegister = null;
            state.errorRegister = null;
        },
        clearVerfiyAccount : (state)=>{
            state.dataVerify = null
        }

    },
    extraReducers: (builder) => {


        //login 

        builder.addCase(login.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null
        })
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;

        })

        //register

        builder.addCase(register.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.dataRegister = action.payload
            state.user = action.payload;
            state.errorRegister = null
        })
        builder.addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;

        })


        //verify

        builder.addCase(verifyAccount.pending, (state) => {
            state.loadingVerify = true
        });
        builder.addCase(verifyAccount.fulfilled, (state, action) => {
            state.loadingVerify = false;
            state.dataVerify = action.payload;
            state.errorVerify = null
        })
        builder.addCase(verifyAccount.rejected, (state, action) => {
            state.loadingVerify = false;
            state.errorVerify = action.error.message;
            console.log(action.error)

        })


        //loaduser

        builder.addCase(getMyProfile.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getMyProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = true
        })
        builder.addCase(getMyProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.loadUserError = action.error.message;

        })


        //updateprofile

        builder.addCase(updateProfile.pending, (state) => {
            state.loadingProfileUpdate = true;
        })

        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.loadingProfileUpdate = false
            state.dataProfileUpdate = action.payload

        })
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.loadingProfileUpdate = false
            state.errorProfileUpdate = action.error.message

        })


        //update password 

        builder.addCase(changePassword.pending, (state) => {
            state.loadingChangePassword = true;
        })

        builder.addCase(changePassword.fulfilled, (state, action) => {
            state.loadingChangePassword = false
            state.dataChangePassword = action.payload

        })
        builder.addCase(changePassword.rejected, (state, action) => {
            state.loadingChangePassword = false
            state.errorChangePassword = action.error.message

        })



        //fogot password 

        builder.addCase(forgetPassword.pending, (state) => {
            state.loadingForgotPassword = true;
        })

        builder.addCase(forgetPassword.fulfilled, (state, action) => {
            state.loadingForgotPassword = false
            state.dataForgotPassword = action.payload

        })
        builder.addCase(forgetPassword.rejected, (state, action) => {
            state.loadingForgotPassword = false
            state.errorForgotPassword = action.error.message

        })



        //reset password 

        builder.addCase(resetPassword.pending, (state) => {
            state.loadingResetPassword = true;
        })

        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.loadingResetPassword = false
            state.dataResetPassword = action.payload

        })
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.loadingResetPassword = false
            state.errorResetPassword = action.error.message

        })






        //logout

        builder.addCase(logout.pending, (state) => {
            state.loadingLogout = true
        })

        builder.addCase(logout.fulfilled, (state, action) => {
            state.loadingLogout = false
            state.user = null;
            state.isAuthenticated = false;
            state.dataLogout = action.payload;

        })


        builder.addCase(logout.rejected, (state, action) => {
            state.loadingLogout = false
            state.isAuthenticated = true
            state.errorLogout = action.error.message;

        })

    }
})

export const { clearUpdateProfile, clearPasswordChange, clearRegister ,clearVerfiyAccount} = auth.actions;

export const authReducer = auth.reducer;