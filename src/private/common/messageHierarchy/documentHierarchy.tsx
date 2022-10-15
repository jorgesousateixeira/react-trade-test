import {FC, useEffect, useState} from "react";
import {TradeDocument} from "../../../models/documents/document";
import MessageHierarchy from "./messageHierarchy";
import styles from './hierarchy.module.css'
import ArrowForwardIosOutlined from "@mui/icons-material/ArrowForwardIosOutlined";

interface DocumentHierarchyProps {
    document: TradeDocument;
    currentId: string;
}

const DocumentHierarchy: FC<DocumentHierarchyProps> = ({ document }) => {
    const [hasChildren, setHasChildren] = useState(false);
    const [hideChildren, setHideChildren] = useState(false);
    useEffect(() => {
        setHasChildren(document && (document?.Documents?.length >0 || document?.Messages?.length > 0));
    });
    const toggleChildren = () => {
        setHideChildren(!hideChildren);
    }
    return (
            <div className={styles.document}>
                <div onClick={toggleChildren}>{
                    hasChildren
                    ? <ArrowForwardIosOutlined/> : '..'
                } D {document?.ID}</div>
                <div className={hideChildren ? [styles.children, styles.hideChildren].join(" ") : styles.children}>
                    {/* ...Messages */}
                    {
                        document?.Messages?.map(function (message, index) {
                            return (<MessageHierarchy key={index} message={message} currentId={message.ID}/>);
                        })
                    }
                    {/* ...Documents */}
                    {
                        document?.Documents?.map(function (document, index) {
                            return (<DocumentHierarchy key={index} document={document} currentId={document.ID}/>);
                        })
                    }</div>
            </div>
    );
};
export default DocumentHierarchy;
