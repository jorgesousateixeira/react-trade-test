import {FC} from "react";
import {TradeMessage} from "../../../models/messages/message";
import DocumentHierarchy from "./documentHierarchy";

interface MessageHierarchyProps {
    message: TradeMessage | null;
    currentId: string | undefined;
}

const MessageHierarchy: FC<MessageHierarchyProps> = ({ message }) => {
    return (
        <div>
            <div>
                <div>M {message?.ID}</div>
                {
                    message?.Documents?.map(function (document, index) {
                    return (
                        <>
                            <DocumentHierarchy document={document} currentId={document.ID} />
                        </>
                    );
                })
                }
            </div>
            {/* Documents */}
            <div>
                {
                    message?.Messages?.map(function (message, index) {
                        return (
                            <>
                                <MessageHierarchy message={message} currentId={message.ID} />
                            </>
                        );
                    })
                }
            </div>
        </div>
    );
};
export default MessageHierarchy;

