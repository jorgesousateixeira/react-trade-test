import {FC, useEffect, useState} from "react";
import {TradeMessage} from "../../../models/messages/message";
import DocumentHierarchy from "./documentHierarchy";
import {inspect} from "util";
import styles from './hierarchy.module.css'
import ArrowForwardIosOutlined from "@mui/icons-material/ArrowForwardIosOutlined";

interface MessageHierarchyProps {
    message: TradeMessage;
    currentId: string | undefined;
}

const MessageHierarchy: FC<MessageHierarchyProps> = ({ message }) => {
    const [hasChildren, setHasChildren] = useState(false);
    const [hideChildren, setHideChildren] = useState(false);
    useEffect(() => {
        setHasChildren(message && (message?.Documents?.length >0 || message?.Messages?.length > 0));
    });

    const toggleChildren = () => {
        setHideChildren(!hideChildren);
    }

    return (
            <div className={styles.message}>
                <div onClick={toggleChildren}>{
                    hasChildren
                    ?  <ArrowForwardIosOutlined/> : '..'
                } M {message?.ID}
                </div>
                <div id={'children-of-' + message.ID}
                     className={hideChildren ? [styles.children, styles.hideChildren].join(" ") : styles.children}>
                    {/* ...Messages */}
                    {message?.Messages?.map(function (message, index) {
                        return (<MessageHierarchy key={index} message={message} currentId={message.ID}/>);
                    })
                    }
                    {/* ...Documents */}
                    {
                        message?.Documents?.map(function (document, index) {
                            return (<DocumentHierarchy key={index} document={document} currentId={document.ID}/>);
                        })
                    }</div>
            </div>
    );
};
export default MessageHierarchy;

