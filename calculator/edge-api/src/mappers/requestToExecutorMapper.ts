import {Executor} from "../models/executor";
import {stringToOperandMapper} from "./stringToOperandMapper";
import ValidationError from "../errors/validation_error";

export function requestToExecutorMapper(body: any) {
    if (!body.url || !body.name || !body.operand) {
        throw new ValidationError('No url, name or operand', {body});
    }

    return new Executor(body.url, body.name, stringToOperandMapper(body.operand));
}