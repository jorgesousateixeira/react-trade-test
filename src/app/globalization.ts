import { Resource as ServerResource} from "../models/globalization/resource";

export function loadLanguageGlobalizations(serverResources: ServerResource[], language: string) {
    const languages = ['en', 'pt'];
    const final: any = {};
    if (serverResources && serverResources.length && languages.findIndex(l => l === language) !== -1) {
        serverResources.forEach(r => { 
            final[r.Code] = r.Translations.find(t => t.LanguageCode === language)?.Value ?? r.Code
        });
    }
    return final;
}
