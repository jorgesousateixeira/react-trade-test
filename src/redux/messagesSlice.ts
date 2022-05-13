import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {counterSlice, incrementAsync} from "../features/counter/counterSlice";
import AccountService from "../api-services/accountService";
import * as localStorageKeys from "../local-storage/localStorageKeys";
import {TradeMessage} from "../models/messages/message";
import {SearchMessageCriteria} from "../models/messages/searchMessageCriteria";
import MessageService from "../api-services/messageService";

export interface MessagesState {
    messages: TradeMessage[];
    count: number;
}

const initialState: MessagesState = {
    messages: [],
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

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(searchMessagesAsync.fulfilled, (state:MessagesState, action) => {
            state.messages = action.payload ? action.payload.ResultData : [];
        })
    }
});

//export const {  } = messagesSlice.actions;
export default messagesSlice.reducer;
