import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PostProps, Page } from "@/types";

const initialState: PostProps = {
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
    loading: false,
    error: null,
};

export const fetchPost = createAsyncThunk(
    "post/fetchPost",
    async (postId: string, { rejectWithValue }) => {},
);
