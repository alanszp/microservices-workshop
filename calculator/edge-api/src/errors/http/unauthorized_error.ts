import RenderableError from "../renderable_error";
import HttpError from "./http_error";

export default class UnauthorizedError extends HttpError implements RenderableError {

    public requiredChecks;

    public constructor(requiredChecks: string[]) {
        super();
        this.requiredChecks = requiredChecks;
    }

    public code(): string {
        return "unauthorized_error";
    }

    public renderMessage(): string {
        return "Unauthorized Error";
    }

    public devMessage(): string {
        return "The server was unable to authenticate this request. Check the context to see the required checks for this endpoint.";
    }

    public context() {
        return {
            requiredChecks: this.requiredChecks,
        };
    }
}
