import {ValidationError} from "./validationError";

export interface ResultMessageIN2<T> {
    IsValid: boolean;
    CorrelationId: string;
    Errors: ValidationError[];
    Warnings: ValidationError[];
    Data: T;
}
