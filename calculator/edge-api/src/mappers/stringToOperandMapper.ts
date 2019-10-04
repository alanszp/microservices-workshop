import {Operand} from "../models/operand";
import ValidationError from "../errors/validation_error";

const stringOperandMap: Map<string, Operand> = new Map<string, Operand>([
    ['sum', Operand.SUM],
    ['division', Operand.DIVISION],
    ['multiply', Operand.MULTIPLY],
    ['percentage', Operand.PERCENTAGE],
    ['subtract', Operand.SUBTRACT],
]);

export function stringToOperandMapper(operand: string): Operand {
    const op = stringOperandMap.get(operand);
    if (!op) {
        throw new ValidationError('Invalid operand', {operand});
    }
    return op;
}