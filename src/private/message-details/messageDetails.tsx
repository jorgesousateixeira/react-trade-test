import {FC, useEffect, useState} from "react";
import PrivateContainer from "../common/privateContainer";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";

import {TradeMessage} from "../../models/messages/message";

const MessageDetails = () => {
    let {id} = useParams();
    const dispatch = useAppDispatch();
    const [message, setMessage] = useState<TradeMessage|undefined>(undefined);

    useEffect(() => {
        if (id) {
            getMessageById(id);
        }
    },[id]);

    function getMessageById(id: string) {
        setMessage({ ID: id } as TradeMessage);
    }

    return (
        <PrivateContainer title="Message details....">
            <h1>{message?.ID}</h1>
        </PrivateContainer>
    );
};

export default MessageDetails;
