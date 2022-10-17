import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {FC, useState} from "react";
import {useNavigate} from "react-router-dom";
import {User} from "../../models/users/user";
import styles from './privateContainer.module.css';



interface Props {
    user: User | undefined;
}
const PositionedMenu: FC<Props> = ({user}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event:any, value: number) => {
        setAnchorEl(null);
        console.log('Closed at: ' + value);
        console.log('event: ' + JSON.stringify(event.target.value));
        if (value === 1) {
            navigate('/private/users/' + user?.ID);
        }
        if (value === 3) {
            navigate('/public/');
        }
    };
    const handleClose2 = () => {
        setAnchorEl(null);
        console.log('Closed at: wherever... ');
    };
    return (
        <div>
            <Button
                className={styles.userName}
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                {user?.Name}
            </Button>
            <Menu
                id="user-logged-menu"
                aria-labelledby="user-logged-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={ handleClose2}
                anchorOrigin={{ vertical: 'top', horizontal: 'left',}}
                transformOrigin={{ vertical: 'top', horizontal: 'left',}}>
                <MenuItem onClick={(event) => handleClose(event, 1)}>Who am I?</MenuItem>
                <MenuItem onClick={(event) => handleClose(event,2)}>User settings</MenuItem>
                <MenuItem onClick={(event) =>handleClose(event,3)}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

export default PositionedMenu;
