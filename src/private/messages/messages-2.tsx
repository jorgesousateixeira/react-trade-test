import {useAppDispatch} from "../../app/hooks";
import {setActiveComponent} from "../../redux/loginSlice";
import {NavigationModulesEnum} from "../../models/clientOnly/navigationModulesEnum";
import {SearchMessageCriteria} from "../../models/messages/searchMessageCriteria";
import {toast} from "react-toastify";
import SearchMessageCriteriaForm from "./searchMessageCriteriaForm";
import PrivateContainer from "../common/privateContainer";
import {t} from "i18next";
import MessageSearchResultTable from "../common/searchResultTables/messageSearchResultTable";
import moment from "moment";
import SearchResultPagination from "../common/pagination/searchResultPagination";
import {useEffect, useRef, useState} from "react";
import { useQuery } from "react-query";
import MessageService from "../../api-services/messageService";
import { ResultMessage } from "../../models/resultMessage/resultMessage";
import { TradeMessage } from "../../models/messages/message";

export function Messages2 () {
    const dispatch = useAppDispatch();
    dispatch(setActiveComponent(NavigationModulesEnum.Messages));

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchCriteria, setSearchCriteria] = useState<SearchMessageCriteria>({} as SearchMessageCriteria);

    const searchMessages = useQuery(['search-messages'], async () => { return await searchMessagesService(); }, { refetchOnWindowFocus: false, enabled: false });
    const searchMessagesService = async () => {
        const resultMessage = await MessageService.searchMessages(searchCriteria);
        let messages: TradeMessage[] = [];

        if (resultMessage) {
            const result = resultMessage as ResultMessage<TradeMessage[]>;
            if (result.IsValid) {
                messages = result.ResultData;
            } else {
                toast.error("Search messages problem...");
            }
        }
            
        return messages;
    }

    const countMessages = useQuery(['count-messages'], async () => { return await countMessagesService(); }, { refetchOnWindowFocus: false, enabled: false });
    const countMessagesService = async () => {
        const resultMessage = await MessageService.countMessages(searchCriteria);
        let nMessages: number = 0;

        if (resultMessage) {
            const result = resultMessage as ResultMessage<number>;
            if (result.IsValid) {
                nMessages = result.ResultData;
            } else {
                toast.error("Count messages problem...");
            }
        }
            
        return nMessages;
    }
    
    const firstSearch = useRef(true);
    useEffect(() => {
        if (!firstSearch.current) { 
            searchMessages.refetch();
            countMessages.refetch();
        } else {
            firstSearch.current = false;
            return;
        }
    }, [searchCriteria, firstSearch]);

    const performSearch = async (criteria: any) => {
        setSearchCriteria({
            StartDate: criteria.StartDate,
            Origin: '',
        } as SearchMessageCriteria);
    }

    const performSearchByTerm = async (term: string) => {
        setSearchTerm(term);
        if (term.length === 9 || term.length === 11 ||  term.length === 13) {
            term = term + '0'
        }

        if (term.length > 8) {
            term = term.substring (0,8) + 'T' + term.substring(8);
        }
        const startDate = moment(term).format('YYYY-MM-DDTHH:mm:ss');
        await performSearch( {StartDate: startDate});
    }

    const handlePageChange = async (pageNumber: number) => {
        console.log('switching to page by term: ' + searchTerm + ' :' + pageNumber);
        await performSearchByTerm( searchTerm);
    }

    return (
        <PrivateContainer title={t('messages.title')}>
            <SearchMessageCriteriaForm handleSearchByFullCriteria={performSearch} handleSearchByTerm={performSearchByTerm} />
            {(countMessages.data && countMessages.data > 0) && <SearchResultPagination totalCount={countMessages.data} handlePageChange={handlePageChange}/>}
            <MessageSearchResultTable messages={searchMessages.data} />
        </PrivateContainer>

    )
}
