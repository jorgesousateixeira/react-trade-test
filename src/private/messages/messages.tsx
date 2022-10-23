import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getTokenAsync, setActiveComponent} from "../../redux/loginSlice";
import {NavigationModulesEnum} from "../../models/clientOnly/navigationModulesEnum";
import SearchBar from "../common/searchBar/searchBar";
import {SearchMessageCriteria} from "../../models/messages/searchMessageCriteria";
import {toast} from "react-toastify";
import {countMessagesAsync, searchMessagesAsync} from "../../redux/messagesSlice";
import SearchMessageCriteriaForm from "./searchMessageCriteriaForm";
import PrivateContainer from "../common/privateContainer";
import {t} from "i18next";
import MessageSearchResultTable from "../common/searchResultTables/messageSearchResultTable";
import moment from "moment";

export function Messages () {
    const dispatch = useAppDispatch();
    //const [messages, setMessages] = useState<TradeMessage[]>([]);

    const messages = useAppSelector((state) => state.messages.messages);
    const countMessages = useAppSelector((state) => state.messages.count);

    dispatch(setActiveComponent(NavigationModulesEnum.Messages));

    const performSearch = async (data: any) => {
        console.log('Performing search: ' + JSON.stringify(data));
        const searchCriteria = {
            StartDate: data.StartDate,
            Origin: '',
        } as SearchMessageCriteria;

        const resultAction = await dispatch(searchMessagesAsync(searchCriteria));
        if (searchMessagesAsync.fulfilled.match(resultAction)) {
            toast.info("Search messages success...");
        } else {
            console.log('Not logged in....');
            toast.error("Search messages problem...");
            if (resultAction.payload) {
                //.. errors
            }
        }
        const resultActionCount = await dispatch(countMessagesAsync(searchCriteria));
        if (countMessagesAsync.fulfilled.match(resultActionCount)) {
            toast.info("Count messages success...");
        } else {
            toast.error("Count messages problem...");
            if (resultActionCount.payload) {
                //.. errors
            }
        }
    }
    const performSearchByTerm = async (term: string) => {
        if (term.length === 9 || term.length === 11 ||  term.length === 13) {
            term = term + '0'
        }

        if (term.length > 8) {
            term = term.substring (0,8) + 'T' + term.substring(8);
        }
        const startDate = moment(term).format('YYYY-MM-DDTHH:mm:ss');
        console.log('Performing search by term start date:' + term + '-' + startDate);
        await performSearch( {StartDate: startDate});
    }

    return (
        <PrivateContainer title={t('messages.title')}>
            <h2>#{countMessages}</h2>
            <SearchMessageCriteriaForm handleSearchByFullCriteria={performSearch} handleSearchByTerm={performSearchByTerm} />
            <MessageSearchResultTable messages={messages} />
        </PrivateContainer>

    )
}
