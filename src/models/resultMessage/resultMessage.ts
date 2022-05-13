import {ValidationError} from "./validationError";

export interface ResultMessage<T> {
    IsValid: boolean;
    CorrelationId: string;
    Errors: ValidationError[];
    ResultData: T;
}
