import HttpError from "./http_error";

export default class NotFoundError extends HttpError {
  public renderMessage(): string {
    return "Not Found";
  }

  public devMessage(): string {
    return "Not Found";
  }
}
