import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {FC, useState, useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {User} from "../../models/users/user";
import styles from './privateContainer.module.css';
import { AppThemeEnum } from '../../models/clientOnly/app-theme.enum';
import * as localStorageKeys from "./../../local-storage/localStorageKeys";
import { Divider, ListItemIcon, ListItemText } from '@mui/material';
import { Logout, Person, Settings, ColorLens, Language } from '@mui/icons-material';
import { LanguagesEnum } from '../../models/clientOnly/languages.enum';
import i18n from '../../i18n';
import { getAppTheme } from '../../api-services/apiUtils';
import { AppContext } from '../../shared/context/app.context';

interface Props {
    user: User | undefined;
}
const PositionedMenu: FC<Props> = ({user}) => {
    const [ AppValue, setAppValue ] = useContext(AppContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorThemeEl, setAnchorThemeEl] = useState<null | HTMLElement>(null);
    const [anchorLangEl, setAnchorLangEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const openMenu = Boolean(anchorEl);
    const openMenuTheme = Boolean(anchorThemeEl);
    const openMenuLang = Boolean(anchorLangEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClickTheme = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorThemeEl(event.currentTarget);
    };
    const handleClickLang = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorLangEl(event.currentTarget);
    };
    const handleClose = (event:any, value: number) => {
        handleCloseAll();
        if (value === 1) {
            navigate('/private/users/' + user?.ID);
        }
        if (value === 3) {
            navigate('/public/');
        }
    };
    const handleCloseTheme = (event: any, value: string) => {
        handleCloseAll();
        localStorage.setItem(localStorageKeys.APP_THEME, value);
        AppValue.theme = value;
        setAppValue({...AppValue});
    };
    const handleCloseLang = (event: any, value: string) => {
        handleCloseAll();
        i18n.changeLanguage(value);
    };
    const handleCloseAll = () => {
        setAnchorEl(null);
        setAnchorThemeEl(null);
        setAnchorLangEl(null);
    }
    const handleClose2 = () => { setAnchorEl(null); };
    const handleClose2Theme = () => { setAnchorThemeEl(null); };
    const handleClose2Lang = () => { setAnchorLangEl(null); };
    return (
        <div>
            <Button
                className={styles.userName}
                id="demo-positioned-button"
                aria-controls={openMenu ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? 'true' : undefined}
                onClick={handleClick}>
                {user?.Name}
            </Button>
            <Menu
                id="user-logged-menu"
                aria-labelledby="user-logged-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={ handleClose2 }
                anchorOrigin={{ vertical: 'top', horizontal: 'right',}}
                transformOrigin={{ vertical: 'top', horizontal: 'right',}}>
                <MenuItem onClick={(event) => handleClose(event, 1)}>
                    <ListItemIcon>
                        <Person fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Who am I?</ListItemText>
                </MenuItem>
                <MenuItem onClick={(event) => handleClose(event, 2)}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>User settings</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClickTheme}>
                    <ListItemIcon>
                        <ColorLens fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Theme</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClickLang}>
                    <ListItemIcon>
                        <Language fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Language</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={(event) => handleClose(event, 3)}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>
            <Menu
                id="theme-menu"
                aria-labelledby="theme-menu"
                anchorEl={anchorThemeEl}
                open={openMenuTheme}
                onClose={ handleClose2Theme }
                anchorOrigin={{ vertical: 'top', horizontal: 'right',}}
                transformOrigin={{ vertical: 'top', horizontal: 'right',}}>
                {Object.values(AppThemeEnum).map((thm) => (
                    <MenuItem onClick={(event) => handleCloseTheme(event, thm)} style={{fontWeight: getAppTheme() === thm ? 'bold' : 'normal'}}>{thm}</MenuItem>
                ))}
            </Menu>
            <Menu
                id="lang-menu"
                aria-labelledby="lang-menu"
                anchorEl={anchorLangEl}
                open={openMenuLang}
                onClose={ handleClose2Lang }
                anchorOrigin={{ vertical: 'top', horizontal: 'right',}}
                transformOrigin={{ vertical: 'top', horizontal: 'right',}}>
                {Object.values(LanguagesEnum).map((lng) => (
                    <MenuItem onClick={(event) => handleCloseLang(event, lng)} style={{fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal'}}>{lng.toLocaleUpperCase()}</MenuItem>
                ))}
            </Menu>
        </div>
    );
}

export default PositionedMenu;
