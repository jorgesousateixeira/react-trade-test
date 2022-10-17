import {useState} from "react";
import styles from './login.module.css'
import {Box, Button, TextField} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getLoggedUserByIdAsync, getTokenAsync, getTokenSuccess} from "../../redux/loginSlice";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import { useSpring, animated } from 'react-spring'
import {Fade} from "../../animations/fade";
import { LanguagesEnum } from "../../models/clientOnly/languages.enum";

export function Login () {
    const dispatch = useAppDispatch();
    const { t, i18n } = useTranslation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const stylesSpring = useSpring({
        from: { opacity: "0" },
        to: { opacity: "1" },
    });

    async function handleLogin(e: any) {
        console.log('handling login....');
        e.preventDefault();
        const resultAction = await dispatch(getTokenAsync({username: username, password: password}));
        if (getTokenAsync.fulfilled.match(resultAction)){
            dispatch(getLoggedUserByIdAsync(username));
            navigate('/private/documents');
        } else {
            console.log('Not logged in....');
            toast.error("Invalid user and pass");
            if (resultAction.payload) {
                //.. errors
            }
        }
    }

    return (
        <>
            <div className={styles.toolbar}>
                <Link to="/public">
                <a>{t('loginPage.backToPublicHome')}</a>
            </Link>
                <div>
                    {Object.values(LanguagesEnum).map((lng) => (
                        <Button key={lng} style={
                            {fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal'}}
                                type="submit"
                                onClick={() => i18n.changeLanguage(lng)}>
                            {lng}
                        </Button>
                    ))}
                </div>
            </div>
            {/* animation test */}
            <Fade>
                <div className={styles.loginContainer}>
                <div className={styles.loginFormTitle}>
                    <span className={styles.appName}>Trade</span>
                    <span className={styles.appName2}>Admin</span>
                </div>
                <div className={styles.enterCredentials}>{t('loginPage.enterCredentials')}</div>
                <Box className={styles.loginBox}>
                    <form onSubmit={handleLogin}>
                        <TextField id="username"
                                   className={styles.loginData}
                                   label={t('loginPage.userName')}
                                   variant="standard"
                                   value={username}
                                   fullWidth
                                   onChange={(e) => setUsername(e.target.value)}/>
                        <TextField id="password"
                                   className={styles.loginData}
                                   label="Password"
                                   variant="standard"
                                   type="password"
                                   fullWidth
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                        <Button className={styles.loginBtn}
                                variant="contained" type={"submit"}>
                            {t('loginPage.btnLogin')}
                        </Button>
                    </form>
                </Box></div>
            </Fade>

        </>
    );
}
