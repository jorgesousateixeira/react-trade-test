import {FC, useState} from "react";
import styles from './pageTile.module.css'

interface PageTitleProps {
    title: string;
}

const PageTitle: FC<PageTitleProps> = ({ title}) => {
    return (
        <div className={styles.title}>
            <span>{title}</span>
        </div>
    );
};
export default PageTitle;
