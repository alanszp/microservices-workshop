import ApiClientError from "./api_client_error";

export default class Non200ResponseError extends ApiClientError {

    public renderMessage() {
        return "The request has caused an error in the third party service.";
    }

    public code() {
        return "non_200_response_error";
    }

    public devMessage() {
        return "The request has caused an error in the third party. There might be a problem with the third party integrated with this API.";
    }
}
