export class DateHelper {

    public static convertFromServerSerialization(dateStr: string): Date {
        const dateStrStripped = dateStr
            .replace('\/','')
            .replace('\/','')
            .replace('Date(','')
            .replace(')','');
        const dateNumber = parseInt(dateStrStripped);
        const date = new Date(dateNumber);

        console.log('Date: ' + dateStr + ' -> ' + dateStrStripped + ' -> ' + date.toString());
        return date;
    }
}
