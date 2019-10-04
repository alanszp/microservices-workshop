import BaseError from "./base_error";
import RenderableError from "./renderable_error";
import {Operand} from "../models/operand";

export default class NoAvailableExecutorError extends BaseError implements RenderableError {

    public operand: Operand;

    constructor(operand: Operand) {
        super("No Available Executor Error");
        this.operand = operand;
    }

    public renderMessage() {
        return "No available executor for given command";
    }

    public code() {
        return "no_available_executor";
    }

    public devMessage() {
        return "No executor configured for the given command. Please, register an executor to POST /tenant/v1/executors";
    }

    public context() {
        return {
            operand: this.operand,
        };
    }

    _renderableError: true;
}
