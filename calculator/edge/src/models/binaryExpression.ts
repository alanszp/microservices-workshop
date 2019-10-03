import {Operand} from "./operand";
import {Expression} from "./expression";
import {Executor} from "./executor";

export class BinaryExpression implements Expression {
    public left: number;
    public right: number;
    public operand: Operand;

    constructor(operand: Operand, left: number, right: number) {
        this.operand = operand;
        this.left = left;
        this.right = right;
    }

    callExecutor(executor: Executor): Promise<number> {
        return Promise.resolve(0);
    }

    serialize(): string {
        return `${this.left} ${this.operand} ${this.right}`;
    }
}
