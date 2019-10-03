import RenderableError from "../renderable_error";
import ApiClientError from "./api_client_error";

export default class ThirdPartyServiceUnavailableError extends ApiClientError implements RenderableError {

    public renderMessage() {
        return "The specified third party service is not responding or the service is unavailable.";
    }

    public code() {
        return "service_unavailable_error";
    }

    public devMessage() {
        return "The specified third party service is not responding or is unavailable.";
    }
}
