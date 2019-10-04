import {Operand} from "./operand";
import {Executor} from "./executor";

export interface Expression {
    operand: Operand;

    callExecutor(executor: Executor): Promise<number>;

    serialize(): string;
}
