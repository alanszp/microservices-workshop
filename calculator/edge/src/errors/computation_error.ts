import BaseError from "./base_error";
import RenderableError from "./renderable_error";

export default class ComputationError extends BaseError implements RenderableError {
    body: any;

    public constructor(body = {}) {
        super('Computation error');
        this.body = body;
    }

    public renderMessage() {
        return this.message;
    }

    public code() {
        return "computation_error";
    }

    public devMessage() {
        return `There was a computation error`;
    }

    public context() {
        return {
            body: this.body
        };
    }

    _renderableError: true;
}
