import {Operand} from "./operand";
import {Expression} from "./expression";
import {Executor} from "./executor";
import {makeRequest} from "../services/communicationService";
import ComputationError from "../errors/computation_error";
import ApiClientError from "../errors/api_client_errors/api_client_error";

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
        return makeRequest(executor, this.operand, {
                left: this.left,
                right: this.right,
            })
            .catch(error => {
                if (error instanceof ApiClientError) {
                    throw new ComputationError({error: error.getError().message});
                }

                throw new ComputationError({error: error.message});
            })
            .then((resp) => {
                if (!resp.body || !resp.body.result) {
                    throw new ComputationError(resp.body);
                }

                return {
                    result: resp.body.result,
                    executor: executor.name,
                }
            });
    }

    serialize(): string {
        return `${this.left} ${this.operand} ${this.right}`;
    }
}
