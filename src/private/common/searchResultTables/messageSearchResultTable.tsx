import {FC} from "react";
import {TradeMessage} from "../../../models/messages/message";
import styles from "./messageSearchResultTable.module.css";
import styles2 from '../privateContainer.module.css'
import moment from "moment";
import TradeDateDisplay from "../tradeDateDisplay";


interface MessageSearchResultProps {
    messages?: TradeMessage[];
}
const MessageSearchResultTable: FC<MessageSearchResultProps> = ({messages}) => {
    return (
        <>
            {messages?.length !== 0 &&
                <table className={[styles2.animatedFadein, 'minimal-table'].join(" ")}>
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
                    {messages?.map(function (message, index) {
                        return <tr key={index}>
                            <td className={styles.tdID}>{message.ID}</td>
                            <td className={styles.tdCreationDate}><TradeDateDisplay date={message.CreationDate}/></td>
                            <td>{message.Status}</td>
                            <td>{message.Origin}</td>
                            <td>{message.Destination}</td>
                            <td className={styles.tdCommAddress}>{message.Type !== 'DATABASE' &&
                                message.CommAddress
                            }</td>
                            <td>{message.BodyEnvelopEnvelopId}</td>
                        </tr>;
                    })}
                    </tbody>
                </table>
            }
        </>
    );
};

export default MessageSearchResultTable;
