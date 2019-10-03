import BaseError from "../base_error";
import RenderableError from "../renderable_error";

export default abstract class ApiClientError extends BaseError implements RenderableError {

    private readonly thirdPartyServiceName;
    private readonly error;
    private readonly requestContext;

    constructor(thirdPartyServiceName: string, error: any, requestContext: any) {
        super("Api Client Error.");
        this.thirdPartyServiceName = thirdPartyServiceName;
        this.error = error;
        this.requestContext = requestContext;
    }

    public abstract renderMessage();
    public abstract code();
    public abstract devMessage();

    public context() {
        return {
            requestContext: this.requestContext,
            thirdPartyServiceName: this.thirdPartyServiceName,
            error: this.error,
        };
    }

    _renderableError: true;
}
