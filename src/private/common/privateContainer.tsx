import {FC, useState} from "react";
import PageTitle from "./pageTitle";
import styles from './privateContainer.module.css'

interface PrivateContainerProps {
    title: string;
}

const PrivateContainer:FC<PrivateContainerProps>  = ( {title,children} ) => {
    return (
       <div className={styles.privateContainer}>
           <PageTitle title={title} />
           {children}
       </div>
    );
};

export default PrivateContainer;
