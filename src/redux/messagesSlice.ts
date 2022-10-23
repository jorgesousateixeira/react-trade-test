import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {counterSlice, incrementAsync} from "../features/counter/counterSlice";
import AccountService from "../api-services/accountService";
import * as localStorageKeys from "../local-storage/localStorageKeys";
import {TradeMessage} from "../models/messages/message";
import {SearchMessageCriteria} from "../models/messages/searchMessageCriteria";
import MessageService from "../api-services/messageService";
import UserService from "../api-services/userService";

export interface MessagesState {
    messages: TradeMessage[];
    currentMessage: TradeMessage | null;
    count: number;
}

const initialState: MessagesState = {
    messages: [],
    currentMessage: null,
    count: -1
};

export const searchMessagesAsync = createAsyncThunk(
    'messages/search',
    async (criteria: SearchMessageCriteria, { rejectWithValue }) => {
        const response = await MessageService.searchMessages(criteria);
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
export const countMessagesAsync = createAsyncThunk(
    'messages/count',
    async (criteria: SearchMessageCriteria, { rejectWithValue }) => {
        const response = await MessageService.countMessages(criteria);
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

export const getMessageByIdAsync = createAsyncThunk(
    'messages/getById',
    async (id:string, { rejectWithValue }) => {
        const response = await MessageService.getMessageProcessing(id);
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

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(searchMessagesAsync.fulfilled, (state:MessagesState, action) => {
            state.messages = action.payload ? action.payload.ResultData : [];
        }).addCase(countMessagesAsync.fulfilled, (state:MessagesState, action) => {
            state.count = action.payload ? action.payload.ResultData : -1;
        }).addCase(getMessageByIdAsync.fulfilled, (state:MessagesState, action) => {
            state.currentMessage = action.payload ? action.payload.ResultData : null;
        })
    }
});

//export const {  } = messagesSlice.actions;
export default messagesSlice.reducer;
