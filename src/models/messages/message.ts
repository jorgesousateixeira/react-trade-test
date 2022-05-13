import {MessageContents} from "./messageContents";

export interface TradeMessage {
    Ack: false;
    AckDate: string; // TODO Date epoch
    AckRetryLimit: number;
    ActionResult: string;
    BodyEnvelop: string;
    BodyEnvelopDestination: string;
    BodyEnvelopDestinationName: string;
    BodyEnvelopDocumentType: string;
    BodyEnvelopEnvelopId: string;
    BodyEnvelopOrigin: string;
    BodyEnvelopOriginName: string;
    BodyEnvelopProcessId: string;
    BodyEnvelopTmrProcessing: number;
    Cause: string;
    CommAddress: string;
    CommAuthCertIssuer: string;
    CommAuthCertSerial: string;
    CommPassword: string;
    CommSharedKey: string;
    CommSpecialData: string;
    CommUser: string;
    Comments: string;
    Compressed: boolean;
    CompressedInfo: false;
    Contents: MessageContents[];
    CreationDate: string; // TODO: Date
    CryptoKeyId: string;
    Destination: string;
    DestinationName: string;
    Direction: string; // TODO: Enum
    Documents: [];
    Encrypted: boolean;
    FilterId: string;
    FolderSize: number;
    HousekeepingPath: string;
    ID: string;
    LastChangeDate: string; // TODO: Date
    LastStatus: string; // TODO: Enum
    Messages: [];
    MsgFilterId: string;
    NParts: number;
    Origin: string;
    OriginCommAddress: string;
    OriginName: string;
    OriginalFilename: string;
    OriginalMessageId: string;
    PathAck: string;
    PathOriginal: string;
    Pooling: string;
    ProcessingStatus: string; // TODO: check if ENUM
    Properties: [];
    ProtocolId: string;
    QueueCreationDate: string; // TODO: Date
    SendRetryLimit: 0;
    SentDate: string; // TODO: Date
    Signed: boolean;
    Status: string; // TODO: check if ENUM
    Subject: string;
    TLSVersion: string;
    TaskId: string;
    TmrPreDocBinary: number;
    TmrPreDocProcessing: number;
    TmrPreDocSplit: number;
    TmrProcessing: number;
    TmrSend: number;
    TmrTotal: number;
    Type: string; // TODO: ENUM
    WorkflowOrder: number;
};
