import { FollowingPage } from "@/types";
import axiosInstance from "@/utils/api";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const initialState: FollowingPage = {
    success: false,
    error: null,
    loading: false,
};

export const followPage = createAsyncThunk(
    "page/follow",
    async (pageId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                `/pages/${pageId}/follow`,
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data.error || "خطایی رخ داده ا��ت",
            );
        }
    },
);

export const unfollowPage = createAsyncThunk(
    "page/unfollow",
    async (pageId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                `/pages/${pageId}/unfollow`,
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data.error || "خطایی رخ داده ا��ت",
            );
        }
    },
);

const followingSlice = createSlice({
    name: "following",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(followPage.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(
                followPage.fulfilled,
                (state, action: PayloadAction<boolean>) => {
                    state.loading = false;
                    state.success = action.payload;
                },
            )
            .addCase(
                followPage.rejected,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.error = action.payload;
                },
            );
    },
});

export default followingSlice.reducer;
