import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { PageState } from "../../../types/index";
import Cookies from "js-cookie";
import axiosInstance from "@/utils/api";

// Initial state
const initialState: PageState = {
    page: null,
    isFollow: false,
    followers: [],
    followings: [],
    posts: [],
    isOwnPage: false,
    loading: false,
    error: null,
};

// Async thunk for fetching page data
export const fetchPage = createAsyncThunk(
    "page/fetchPage",
    async (pageId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/pages/${pageId}`);

            console.log(response);

            return response.data; // Data from API
        } catch (error: any) {
            console.log(error.response.data.error);

            return rejectWithValue(
                error.response?.data.error || "خطایی رخ داده است",
            );
        }
    },
);

// Slice
const pageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        // Define any synchronous actions if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchPage.fulfilled,
                (state, action: PayloadAction<PageState>) => {
                    state.loading = false;
                    state.page = action.payload.page;
                    state.isFollow = action.payload.isFollow;
                    state.followers = action.payload.followers;
                    state.followings = action.payload.followings;
                    state.posts = action.payload.posts;
                    state.isOwnPage = action.payload.isOwnPage;
                },
            )
            .addCase(
                fetchPage.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload || "خطایی رخ داده است";
                },
            );
    },
});

export default pageSlice.reducer;
