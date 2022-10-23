export class PaginationInfo {
    public numberOfRecordsFound = -1;
    public currentPageInClient = 1;
    public previousPageInClient = -1;
    public numberOfRecordsPerPage = 20; // default
    public numberOfRecordsInClient = 0;


    constructor() {
    }

    get canShowNavigateFirst(): boolean {
        return this.startRecord > 1;
    }
    get canShowNavigatePrevious(): boolean {
        return this.startRecord > 1;
    }
    get canShowNavigateNext(): boolean {
        return this.endRecord < this.numberOfRecordsFound;
    }
    get canShowNavigateLast(): boolean {
        return this.endRecord < this.numberOfRecordsFound;
    }
    get canShowPaginationLabelsFromToOf(): boolean {
        return this.numberOfRecordsFound > this.numberOfRecordsInClient;
    }
    get moreThenOneRecordFound(): boolean {
        return this.numberOfRecordsFound > 1;
    }
    get oneRecordFound(): boolean {
        return this.numberOfRecordsFound === 1;
    }
    get startRecord(): number {
        return (this.currentPageInClient - 1) * this.numberOfRecordsPerPage + 1;
    }
    get endRecord(): number {
        let endRecord = this.startRecord + this.numberOfRecordsInClient - 1;
        if(endRecord >= this.numberOfRecordsFound)
            return this.numberOfRecordsFound;

        let supposedEndRecord = this.startRecord + this.numberOfRecordsPerPage - 1;
        if(endRecord < supposedEndRecord && supposedEndRecord < this.numberOfRecordsFound)
            return supposedEndRecord;

        return endRecord;
    }
    get lastPage(): number {
        return Math.ceil(this.numberOfRecordsFound / this.numberOfRecordsPerPage);
    }
    get numberOfRecordsInLastPage(): number {
        return this.numberOfRecordsFound - ((this.lastPage - 1) * this.numberOfRecordsPerPage);
    }

    setNumberOfRecordsReceived(numberOfRecordsReceived: number) {
        this.numberOfRecordsInClient = numberOfRecordsReceived;
    }
    setNumberOfTotalCountRecords(totalRecords: number) {
        this.numberOfRecordsFound = totalRecords;
        if(totalRecords <= this.numberOfRecordsPerPage)
            this.setDefaultPage();
    }
    private setDefaultPage(){
        this.currentPageInClient = 1;
        this.previousPageInClient = -1;
    }
}
