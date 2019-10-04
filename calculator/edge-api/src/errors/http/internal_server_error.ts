import HttpError from "./http_error";

export default class InternalServerError extends HttpError {

    public error;

    constructor(err?: object) {
        super();
        this.error = err;
    }

    public renderMessage(): string {
        return "Internal Server Error";
    }

    public devMessage(): string {
        return "Internal Server Error";
    }

    public context() {
        return {
            errors: this.error,
        };
    }
}
