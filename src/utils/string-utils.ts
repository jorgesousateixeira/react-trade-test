export class StringUtils {

    static getCurrentDateTimeAsTradeStartId(): string {
        const currentDate = new Date();
        const currentMonth = currentDate.getUTCMonth() + 1;
        const currentDay = currentDate.getUTCDate();
        const currentHour = currentDate.getUTCHours();
        const currentMinute = currentDate.getUTCMinutes();

        return '' + currentDate.getUTCFullYear()
            + (currentMonth < 10 ? '0' + currentMonth : currentMonth)
            + (currentDay < 10 ? '0' + currentDay : currentDay)
            + (currentHour < 10 ? '0' + currentHour : currentHour);
    }
}
