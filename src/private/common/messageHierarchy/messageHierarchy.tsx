import {FC} from "react";
import {TradeMessage} from "../../../models/messages/message";
import DocumentHierarchy from "./documentHierarchy";
import {inspect} from "util";
import styles from './hierarchy.module.css'
import ArrowForwardIosOutlined from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlined from "@mui/icons-material/ArrowForwardIosOutlined";

interface MessageHierarchyProps {
    message: TradeMessage | null;
    currentId: string | undefined;
}

const MessageHierarchy: FC<MessageHierarchyProps> = ({ message }) => {
    return (
        <div>
            <div className={styles.message}>
                <div>{
                    (message && (message?.Documents?.length >0 || message?.Messages?.length > 0))
                    ?  <ArrowForwardIosOutlined/> : '..'
                } M {message?.ID}</div>
                {/* ...Messages */}
                    {
                        message?.Messages?.map(function (message, index) {
                            return (
                                <MessageHierarchy message={message} currentId={message.ID} />
                            );
                        })
                    }
                {/* ...Documents */}
                {
                    message?.Documents?.map(function (document, index) {
                    return (
                            <DocumentHierarchy document={document} currentId={document.ID} />
                    );
                })
                }
            </div>
        </div>
    );
};
export default MessageHierarchy;

