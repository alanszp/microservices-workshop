import { snakeCase } from "lodash";
import BaseError from "../base_error";
import RenderableError from "../renderable_error";

export default abstract class HttpError extends BaseError implements RenderableError {
  constructor() {
    super("HttpError");
  }

  public abstract renderMessage(): string;

  public abstract devMessage(): string;

  public code() {
    return snakeCase(this.renderMessage());
  }

  public context() {
    return {};
  }

    _renderableError: true;
}
