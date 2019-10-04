import {map} from "lodash";
import BaseError from "./base_error";
import RenderableError from "./renderable_error";

export default class JsonSchemaError extends BaseError implements RenderableError {
    public schema: any;
    public body: any;
    public validation: any;

    constructor(schema, body, validation) {
        super("JSON schema error");
        this.schema = schema;
        this.body = body;
        this.validation = validation;
    }

    public renderMessage() {
        return "There are % errors in the body".replace("%", this.validation.errors.length);
    }

    public code() {
        return "json_schema_error";
    }

    public devMessage() {
        return `Your body does not match with the schema ${this.schema}`;
    }

    public context() {
        return {
            schema: this.schema,
            body: this.body,
            missingSchemas: this.validation.missing,
            errors: this.errors(),
        };
    }

    private errors() {
        return map(this.validation.errors, (error) => {
            delete error.stack;
            return error;
        });
    }

    _renderableError: true;
}
