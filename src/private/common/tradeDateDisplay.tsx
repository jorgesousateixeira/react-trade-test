import {FC, useEffect, useState} from "react";
import moment from "moment";

interface TradeDateDisplayProps {
    date: string;
}

const TradeDateDisplay: FC<TradeDateDisplayProps> = ({ date }) => {
    const [dateVal, setDAteVal] = useState<string>();

    useEffect(() => {
        if (date) {
            setDAteVal(moment(date).format('YYYY-MM-DD hh:mm:ss.SSS'))
        }
    },[date]);
    return (
        <>
            {dateVal}
        </>
);
};
export default TradeDateDisplay;
