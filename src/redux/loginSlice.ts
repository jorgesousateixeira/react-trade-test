import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {counterSlice, incrementAsync} from "../features/counter/counterSlice";
import AccountService from "../api-services/accountService";
import * as localStorageKeys from "../local-storage/localStorageKeys";
import {User} from "../models/users/user";
import UserService from "../api-services/userService";

export interface LoginState {
    token: string;
    isAuthenticated: boolean;
    activeComponent: string;
    user: User | undefined;
}

const initialState: LoginState = {
    token: 'NO_TOKEN',
    isAuthenticated: false,
    activeComponent: '',
    user: undefined
};

export const getTokenAsync = createAsyncThunk(
    'login/getToken',
    async (params: any, {rejectWithValue}) => {
        const {username, password} = params;
        const response = await AccountService.getToken(params.username, params.password);
        // The value we return becomes the `fulfilled` action payload
        if (response) {
            if (response.IsValid) {
                localStorage.setItem(localStorageKeys.APP_LOGGED_USER_TOKEN, response.ResultData);
                return response;
            } else {
                return rejectWithValue(response.Errors);
            }
        }
        return response;
    }
);

export const getLoggedUserByIdAsync = createAsyncThunk(
    'login/getUserById',
    async (id: string, {rejectWithValue}) => {
        const response = await UserService.getUserById(id);
        // The value we return becomes the `fulfilled` action payload
        if (response) {
            if (response.IsValid) {
                localStorage.setItem(localStorageKeys.APP_LOGGED_USER, JSON.stringify(response.ResultData));
                return response;
            } else {
                return rejectWithValue(response.Errors);
            }
        }
        return response;
    }
);

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        getTokenSuccess: (state: LoginState, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setActiveComponent: (state: LoginState, action: PayloadAction<string>) => {
            state.activeComponent = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getTokenAsync.fulfilled, (state: LoginState, action) => {
            state.token = action.payload ? action.payload.ResultData : 'NO_TOKEN_YET';
        })
            .addCase(getLoggedUserByIdAsync.fulfilled, (state: LoginState, action) => {
                state.user = action.payload ? action.payload.ResultData : undefined;
            })
    }
});

export const {getTokenSuccess, setActiveComponent} = loginSlice.actions;
export default loginSlice.reducer;
