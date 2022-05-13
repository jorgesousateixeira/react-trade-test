import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../models/users/user";
import UserService from "../api-services/userService";
import {SearchMessageCriteria} from "../models/messages/searchMessageCriteria";
import MessageService from "../api-services/messageService";

export interface UsersState {
    users: User[] | undefined;
    count: number;
    user: User | undefined;
}

const initialState: UsersState = {
    users: [],
    count: -1,
    user: undefined
};

export const searchUsersAsync = createAsyncThunk(
    'users/search',
    async (criteria: string, { rejectWithValue }) => {
        const response = await UserService.searchUsers(criteria);
        // The value we return becomes the `fulfilled` action payload
        if (response) {
            if (response.IsValid) {
                return response;
            } else {
                return rejectWithValue(response.Errors);
            }
        }
        return response;
    }
);
export const getUserByIdAsync = createAsyncThunk(
    'users/getById',
    async (id:string, { rejectWithValue }) => {
        const response = await UserService.getUserById(id);
        if (response) {
            if (response.IsValid) {
                return response;
            } else {
                return rejectWithValue(response.Errors);
            }
        }
        return response;
    }
);

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getUserByIdAsync.fulfilled, (state:UsersState, action) => {
            state.user = action.payload ? action.payload.ResultData : undefined;
        }).addCase(searchUsersAsync.fulfilled, (state:UsersState, action) => {
                state.users = action.payload ? action.payload.ResultData : undefined;
            })
    }
});

export default usersSlice.reducer;
