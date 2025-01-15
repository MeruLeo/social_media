import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

interface LoginState {
    isLoading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: LoginState = {
    isLoading: false,
    error: null,
    success: false,
};

export const loginUser = createAsyncThunk(
    "auth/login",
    async (
        userData: {
            email: string;
            password: string;
        },
        thunkAPI,
    ) => {
        try {
            const response = await axios.post(
                "http://localhost:8001/v1/auth/login",
                userData,
                {
                    withCredentials: true,
                },
            );

            toast("با موفقیت وارد شدید", {
                icon: "✅",
                style: {
                    borderRadius: "100px",
                    background: "#333",
                    color: "#fff",
                },
            });

            return response.data;
        } catch (error: any) {
            toast(error.response?.data?.message || "خطایی رخ داد", {
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

const loginSlice = createSlice({
    name: "login",
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
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.isLoading = false;
                state.success = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetState } = loginSlice.actions;
export default loginSlice.reducer;
