// src/redux/slices/registerSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// نوع داده‌های مربوط به کاربر
interface RegisterState {
    isLoading: boolean;
    error: string | null;
    success: boolean;
}

// وضعیت اولیه
const initialState: RegisterState = {
    isLoading: false,
    error: null,
    success: false,
};

// درخواست ثبت‌نام
export const registerUser = createAsyncThunk(
    "auth/register",
    async (
        userData: {
            username: string;
            name: string;
            email: string;
            password: string;
        },
        thunkAPI,
    ) => {
        try {
            const response = await axios.post(
                "http://localhost:8001/v1/auth/register",
                userData,
            );

            toast("حساب با موفقیت ایجاد شد", {
                icon: "✅",
                style: {
                    borderRadius: "100px",
                    background: "#333",
                    color: "#fff",
                },
            });

            return response.data;
        } catch (error: any) {
            toast(error.response?.data?.error || "خطایی رخ داد", {
                icon: "❌",
                style: {
                    borderRadius: "100px",
                    background: "#333",
                    color: "#fff",
                },
            });

            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "خطایی رخ داد",
            );
        }
    },
);

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        resetState: (state) => {
            state.isLoading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                state.success = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetState } = registerSlice.actions;
export default registerSlice.reducer;
