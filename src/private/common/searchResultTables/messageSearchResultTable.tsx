import {FC} from "react";
import {TradeMessage} from "../../../models/messages/message";
import styles from "../privateContainer.module.css";


interface MessageSearchResultProps {
    messages?: TradeMessage[];
}
const MessageSearchResultTable: FC<MessageSearchResultProps> = ({messages}) => {
    return (
        <>
            <table className="minimal-table">
                <thead>
                <th>Id</th>
                <th>Created</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                </thead>
                <tbody>
                {messages?.map(function(message, index){
                    return <tr key={ index }>
                        <td>{message.ID}</td>
                        <td>{message.CreationDate}</td>
                        <td>{message.Status}</td>
                        <td>{message.Origin}</td>
                        <td>{message.Destination}</td>
                        <td>{message.Type !== 'DATABASE' &&
                            message.CommAddress
                        }</td>
                        <td>{message.BodyEnvelopEnvelopId}</td>
                    </tr>;
                })}
                </tbody>
            </table>
        </>
    );
};

export default MessageSearchResultTable;
