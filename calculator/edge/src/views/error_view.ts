import config from "../config";
import RenderableError from "../errors/renderable_error";

export default function errorView(err: RenderableError): object {
  return {
    code: err.code(),
    message: err.renderMessage(),
    context: err.context(),
    origin: `${config.get("origin_name")}:${process.env.NODE_ENV || "development"}`,
    devMessage: err.devMessage(),
  };
}
