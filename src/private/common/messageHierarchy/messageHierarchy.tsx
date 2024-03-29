import {FC, RefObject, useEffect, useRef, useState} from "react";
import {TradeMessage} from "../../../models/messages/message";
import DocumentHierarchy from "./documentHierarchy";
import {inspect} from "util";
import styles from './hierarchy.module.css'
import ArrowForwardIosOutlined from "@mui/icons-material/ArrowForwardIosOutlined";
import {animated, useSpring} from "react-spring";

interface MessageHierarchyProps {
    message: TradeMessage;
    currentId: string | undefined;
}

const MessageHierarchy: FC<MessageHierarchyProps> = ({ message }) => {
    const ref = useRef<HTMLDivElement>({} as HTMLDivElement);
    const [style, animate] = useSpring(() => ({ height: "0px" }), []);

    const [hasChildren, setHasChildren] = useState(false);
    const [hideChildren, setHideChildren] = useState(false);
    useEffect(() => {
        setHasChildren(message && (message?.Documents?.length >0 || message?.Messages?.length > 0));
        animate({
            height: (hideChildren ? 0 : ref?.current?.offsetHeight) + "px"
        });
    });


    const toggleChildren = () => {
        setHideChildren(!hideChildren);
    }

    return (
            <div className={styles.message}>
                <div className={styles.infoAndToggle}>
                    { hasChildren ? <div onClick={toggleChildren}
                                          className={ !hideChildren ? styles.iconToRotate : [styles.iconToRotate, styles.iconRotate].join(" ")}>
                        <ArrowForwardIosOutlined/></div>
                        : <div>X</div>} M {message?.ID}
                </div>
                <animated.div
                    style={{
                        background: "purple",
                        overflow: "hidden",
                        width: "100%",
                        ...style
                    }}
                >
                <div ref={ref} id={'children-of-' + message.ID}
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
                </animated.div>
            </div>
    );
};
export default MessageHierarchy;

