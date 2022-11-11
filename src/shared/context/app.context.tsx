import { createContext, useState } from "react";
import { getAppTheme } from "../../api-services/apiUtils";
import { NavigationModulesEnum } from "../../models/clientOnly/navigationModulesEnum";

type IAppValue = {
    activeComponent: string;
    theme: string;
};

type IAppContext = [IAppValue, React.Dispatch<React.SetStateAction<IAppValue>>];

export const AppContext = createContext<IAppContext>([{} as IAppValue, () => null]);

export const AppProvider = (props: any) => {
    const [AppValue, setAppValue] = useState<IAppValue>(
        {
            activeComponent: NavigationModulesEnum.PrivateHome,
            theme: getAppTheme()
        } as IAppValue
    );
    return <AppContext.Provider value={[AppValue, setAppValue]}>{props.children}</AppContext.Provider>;
};