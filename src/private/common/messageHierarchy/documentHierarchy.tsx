import {FC} from "react";
import {TradeDocument} from "../../../models/documents/document";
import MessageHierarchy from "./messageHierarchy";
import styles from './hierarchy.module.css'
import ArrowForwardIosOutlined from "@mui/icons-material/ArrowForwardIosOutlined";

interface DocumentHierarchyProps {
    document: TradeDocument;
    currentId: string;
}

const DocumentHierarchy: FC<DocumentHierarchyProps> = ({ document }) => {
    return (
        <div>
            <div className={styles.document}>
                <div>{
                    (document && (document?.Documents?.length >0 || document?.Messages?.length > 0))
                    ? <ArrowForwardIosOutlined/> : '..'
                } D {document?.ID}</div>
                {/* ...Messages */}
                    {
                        document?.Messages?.map(function (message, index) {
                            return (<MessageHierarchy message={message} currentId={message.ID} />);
                        })
                    }
                {/* ...Documents */}
                {
                    document?.Documents?.map(function (document, index) {
                        return (<DocumentHierarchy document={document} currentId={document.ID} />);
                    })
                }
            </div>
        </div>
    );
};
export default DocumentHierarchy;
