import {ExpressionType} from "../models/expressionType";
import {stringToOperandMapper} from "./stringToOperandMapper";
import {Operand} from "../models/operand";
import {BinaryExpression} from "../models/binaryExpression";
import {Expression} from "../models/expression";
import ValidationError from "../errors/validation_error";

type ExpressionConstructor = (operand: Operand, expression: any) => Expression;

const expressionConstructorMap: Map<ExpressionType, ExpressionConstructor> = new Map([
    [ExpressionType.BINARY, requestToBinaryExpressionMapper]
]);

function requestToBinaryExpressionMapper(operand: Operand, expression: any) {
    if (!expression.left || !expression.right) {
        throw new ValidationError('No right or left in expression for binary expression', {expression});
    }

    return new BinaryExpression(operand, expression.left, expression.right);
}

export function requestToExpressionMapper(body: any) {
    if (!body.expressionType || !body.expression || !body.operand) {
        throw new ValidationError('No expressionType, expression or operand', {body});
    }

    const expressionConstructor = expressionConstructorMap.get(body.expressionType);

    if (!expressionConstructor) {
        throw new ValidationError('Invalid expression type'), {expressionType: body.expressionType};
    }

    return expressionConstructor(stringToOperandMapper(body.operand), body.expression);
}
