import HttpError from "./http_error";

export default class BadRequestError extends HttpError {

    private errors;

    public constructor(errors: string[]) {
        super();
        this.errors = errors;
    }

    public renderMessage(): string {
        return "Bad Request";
    }

    public devMessage(): string {
        return "Bad Request";
    }

    public context() {
        return {
            errors: this.errors,
        };
    }
}
