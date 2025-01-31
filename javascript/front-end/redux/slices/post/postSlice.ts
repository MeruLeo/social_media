import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { PostProps, Page, PostState, PostMediaProps } from "@/types";
import axiosInstance from "@/utils/api";

const initialState: PostState = {
    post: {
        _id: "",
        user: {
            _id: "",
            name: "",
            avatar: "",
            username: "",
            bio: "",
            isVerified: false,
        },
        caption: "",
        media: {
            _id: "",
            path: "",
            filename: "",
        },
        hashtags: [],
    },
    loading: false,
    error: null,
};

//!neded back end feature
// export const fetchPost = createAsyncThunk(
//     "post/fetchPost",
//     async (postId: string, { rejectWithValue }) => {},
// );

export const createPost = createAsyncThunk(
    "post/create",
    async (postData: FormData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/posts`, postData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            return response.data;
        } catch (error) {
            console.log(error.response.data);

            return rejectWithValue(
                error.response?.data.error || "خطایی رخ داده است",
            );
        }
    },
);

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                createPost.fulfilled,
                (state, action: PayloadAction<PostProps>) => {
                    state.loading = false;
                    state.post = {
                        _id: action.payload._id,
                        user: action.payload.user,
                        caption: action.payload.caption,
                        media: action.payload.media,
                        hashtags: action.payload.hashtags,
                    };
                    state.error = null;
                },
            )
            .addCase(
                createPost.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload || "خطایی رخ داده است";
                },
            );
    },
});

export default postSlice.reducer;
