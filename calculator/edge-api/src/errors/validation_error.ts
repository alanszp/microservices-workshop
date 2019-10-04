import BaseError from "./base_error";
import RenderableError from "./renderable_error";

export default class ValidationError extends BaseError implements RenderableError {
    input: any;

    public constructor(message, input = {}) {
        super(message);
        this.input = input;
    }

    public renderMessage() {
        return this.message;
    }

    public code() {
        return "validation_error";
    }

    public devMessage() {
        return `There was a validation error`;
    }

    public context() {
        return {
            input: this.input
        };
    }

    _renderableError: true;
}
