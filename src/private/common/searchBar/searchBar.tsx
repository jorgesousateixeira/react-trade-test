import Button from "@mui/material/Button";
import {Input, TextField} from "@mui/material";
import {FC, useState} from "react";
import styles from './searchBar.module.css'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import {t} from "i18next";


interface SearchBarProps {
    handleSearch: any;
    initialTerm?: string ;
    label?: string;
}

const SearchBar: FC<SearchBarProps> = ({handleSearch, label, initialTerm}) => {
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
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
{/*                   <Input id="searchTerm"
                               // label= {label ? label : t('searchBar.defaultSearchBarLabel')}
                               // variant="standard"
                               value={searchTerm}
                               fullWidth
                               onChange={(e) => setSearchTerm(e.target.value)}/>*/}
                    <Button variant="contained" type={"submit"} endIcon={<ExpandMoreOutlinedIcon/>}>
                        Search
                    </Button>
                </form>
            </div>
        </>
    );
};

export default SearchBar;
