import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { PageState, Page, MediaProps } from "../../../types/index";
import Cookies from "js-cookie";
import axiosInstance from "@/utils/api";

// Initial state
const initialState: PageState = {
    page: null,
    isFollow: false,
    followers: [],
    followings: [],
    posts: [],
    private: false,
    isOwnPage: false,
    isLoggedIn: !!Cookies.get("token"),
    isVerified: false,
    loading: false,
    error: null,
};

interface EditPagePayload {
    pageId: string;
    field: keyof Page;
    value: string | boolean;
}

interface EditAvatarProps {
    pageId: string;
    avatar: FormData;
}

// Async thunk for fetching page data
export const fetchPage = createAsyncThunk(
    "page/fetchPage",
    async (pageId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/pages/${pageId}`);

            return response.data;
        } catch (error: any) {
            console.log(error.response.data.error);

            return rejectWithValue(
                error.response?.data.error || "خطایی رخ داده است",
            );
        }
    },
);

export const editPage = createAsyncThunk<
    Page,
    { pageId: string; updates: Partial<Page> },
    { rejectValue: string }
>("page/editPage", async ({ pageId, updates }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(
            `/pages/${pageId}/edit`,
            updates,
        );

        return response.data;
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error ||
            "خطایی در ویرایش صفحه رخ داده است. لطفاً دوباره امتحان کنید.";

        return rejectWithValue(errorMessage);
    }
});

export const editAvatar = createAsyncThunk<
    Page,
    EditAvatarProps,
    { rejectValue: string }
>("page/editAvatar", async ({ avatar, pageId }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(
            `/pages/${pageId}/edit/avatar`,
            avatar,
            {
                headers: { "Content-Type": "multipart/form-data" },
            },
        );

        return response.data;
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error ||
            "خطایی در ویرایش صفحه رخ داده است. لطفاً دوباره امتحان کنید.";

        return rejectWithValue(errorMessage);
    }
});

// Slice
const pageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        setLoggedIn: (state) => {
            state.isLoggedIn = !!Cookies.get("access-token");
        },
        setVerified: (state, action: PayloadAction<boolean>) => {
            state.isVerified = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetch page
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
                    state.private = action.payload.private;
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
            )
            // edit page
            .addCase(editPage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editPage.fulfilled, (state, action) => {
                state.loading = false;
                if (state.page) {
                    state.page = { ...state.page, ...action.payload };
                }
            })
            .addCase(editPage.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload || "خطایی رخ داده است";
            })
            //edit avatar
            .addCase(editAvatar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editAvatar.fulfilled, (state, action) => {
                state.loading = false;
                if (state.page) {
                    state.page = {
                        ...state.page,
                        avatar: action.payload.avatar,
                    };
                }
            })
            .addCase(
                editAvatar.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload || "خطایی رخ داده است";
                },
            );
    },
});

export const { setLoggedIn, setVerified } = pageSlice.actions;
export default pageSlice.reducer;
