import {FC} from "react";
import {TradeDocument} from "../../../models/documents/document";
import MessageHierarchy from "./messageHierarchy";
import styles from './hierarchy.module.css'

interface DocumentHierarchyProps {
    document: TradeDocument;
    currentId: string;
}

const DocumentHierarchy: FC<DocumentHierarchyProps> = ({ document }) => {
    return (
        <div>
            <div className={styles.document}>
                <div>D {document?.ID}</div>
                {
                    document?.Documents?.map(function (document, index) {
                        return (
                            <>
                                <DocumentHierarchy document={document} currentId={document.ID} />
                            </>
                        );
                    })
                }
            </div>
            {/* Messages */}
            <div className={styles.message}>
                {
                    document?.Messages?.map(function (message, index) {
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
export default DocumentHierarchy;
