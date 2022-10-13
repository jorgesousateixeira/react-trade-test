import {FC, useEffect, useState} from "react";
import PrivateContainer from "../common/privateContainer";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";

import {TradeMessage} from "../../models/messages/message";
import {getUserByIdAsync} from "../../redux/usersSlice";
import {toast} from "react-toastify";
import {getMessageByIdAsync} from "../../redux/messagesSlice";
import MessageHierarchy from "../common/messageHierarchy/messageHierarchy";

const MessageDetails = () => {
    let {id} = useParams();
    const dispatch = useAppDispatch();
    const [message, setMessage] = useState<TradeMessage|null>(null);

    useEffect(() => {
        if (id) {
            getMessageById(id).then();
        }
    },[id]);

    async function getMessageById(id: string) {
        const resultAction = await dispatch(getMessageByIdAsync(id));
        if (getMessageByIdAsync.fulfilled.match(resultAction)) {
            setMessage(resultAction.payload ? resultAction.payload.ResultData : null);
        }
    }


    return (
        <PrivateContainer title="Message details....">
            <MessageHierarchy message={message} currentId={message?.ID} />
            <p>{JSON.stringify(message)}</p>
        </PrivateContainer>
    );
};

export default MessageDetails;
