import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getTokenAsync, setActiveComponent} from "../../redux/loginSlice";
import {NavigationModulesEnum} from "../../models/clientOnly/navigationModulesEnum";
import SearchBar from "../common/searchBar/searchBar";
import {SearchMessageCriteria} from "../../models/messages/searchMessageCriteria";
import {toast} from "react-toastify";
import {searchMessagesAsync} from "../../redux/messagesSlice";
import SearchMessageCriteriaForm from "./searchMessageCriteriaForm";
import PrivateContainer from "../common/privateContainer";
import {t} from "i18next";
import MessageSearchResultTable from "../common/searchResultTables/messageSearchResultTable";

export function Messages () {
    const dispatch = useAppDispatch();
    //const [messages, setMessages] = useState<TradeMessage[]>([]);

    const messages = useAppSelector((state) => state.messages.messages);

    dispatch(setActiveComponent(NavigationModulesEnum.Messages));

    const performSearch = async (data: any) => {
        console.log('Performing search: ' + JSON.stringify(data));
        const searchCriteria = {
            StartDate: '2022-02-21',
            Origin: '',
        } as SearchMessageCriteria;

        const resultAction = await dispatch(searchMessagesAsync(searchCriteria));
        if (getTokenAsync.fulfilled.match(resultAction)) {
            toast.info("Search messages success...");
        } else {
            console.log('Not logged in....');
            toast.error("Search messages problem...");
            if (resultAction.payload) {
                //.. errors
            }
        }
    }
    const performSearchByTerm = async (term: any) => {
        console.log('Performing search by term');
    }

    return (
        <PrivateContainer title={t('messages.title')}>
            <SearchMessageCriteriaForm handleSearchByFullCriteria={performSearch} handleSearchByTerm={performSearchByTerm} />
            <MessageSearchResultTable messages={messages} />
        </PrivateContainer>

    )
}
