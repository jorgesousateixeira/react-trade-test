import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

export function PublicHome () {
    const { t } = useTranslation();
    return (
        <>
            <h1>{t('public-home.title')}</h1>
            <Link to="/public/login">Login</Link>
        </>
    )
}
