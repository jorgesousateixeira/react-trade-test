import Button from "@mui/material/Button";
import {Input, TextField} from "@mui/material";
import {FC, useState} from "react";
import styles from './searchBar.module.css'
import ArrowForwardIosOutlined from '@mui/icons-material/ArrowForwardIosOutlined';
import {t} from "i18next";


interface SearchBarProps {
    handleSearch: any;
    handleToggle: any;
    initialTerm?: string;
    label?: string;
    isMoreCriteriaOpen: boolean;
}

const SearchBar: FC<SearchBarProps> = ({handleSearch, label, initialTerm, handleToggle, isMoreCriteriaOpen}) => {
    const [searchTerm, setSearchTerm] = useState(initialTerm ? initialTerm : "");
    return (
        <>
            <div className={styles.searchBar}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch(searchTerm)
                }}>
                    <input type="text"
                           placeholder={ t(label || 'searchBar.defaultSearchBarLabel')}
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}/>
                    <div onClick={handleToggle}
                         className={ isMoreCriteriaOpen ? styles.iconToRotate
                             : [styles.iconToRotate, styles.iconRotate].join(" ")}><ArrowForwardIosOutlined/></div>
                    <Button variant="text" type={"submit"}>{t('searchBar.go')}</Button>
                </form>
            </div>
        </>
    );
};

export default SearchBar;
