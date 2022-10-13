import {FC} from "react";
import {TradeDocument} from "../../../models/documents/document";
import MessageHierarchy from "./messageHierarchy";

interface DocumentHierarchyProps {
    document: TradeDocument;
    currentId: string;
}

const DocumentHierarchy: FC<DocumentHierarchyProps> = ({ document }) => {
    return (
        <div>
            <div>
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
            {/* Documents */}
            <div>
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
