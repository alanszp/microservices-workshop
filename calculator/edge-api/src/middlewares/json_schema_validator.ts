import * as Promise from "bluebird";
import * as fs from "fs";
import {each} from "lodash";
import * as path from "path";
import * as tv4 from "tv4";
import config from "../config";
import log from "../logger";
import errorView from "../views/error_view";
import JsonSchemaError from "../errors/json_schema_error";

export class JsonSchemaValidator {
    public schemas: string[];
    public schemaPath: string;

    constructor(schemaPath) {
        this.schemas = [];
        this.schemaPath = schemaPath;
        this.loadSchemas();
    }

    public loadSchemas() {
        try {
            const files = fs.readdirSync(this.schemaPath).filter((f) => path.extname(f) === ".json");
            each(files, (file) => {
                try {
                    this.schemas.push(file);
                    const data = fs.readFileSync(this.schemaPath + file, {
                        encoding: "utf8",
                    });

                    const fullRoute = this.fullRoute(file);
                    tv4.addSchema(fullRoute, JSON.parse(data));
                } catch (e) {
                    log.error(`Error loading schema: ${file}`, {error: e}); // eslint-disable-line no-console
                    throw e;
                }
            });
        } catch (e) {
            log.error("Error loading schemas dir. Check if you have copied/soft link it.", {error: e}); // eslint-disable-line no-console
            throw e;
        }
    }

    public fullRoute(schema) {
        return `file://${this.schemaPath}${schema}`;
    }

    public validate(schema, json) {
        return new Promise((resolve, reject) => {
            const schemaRoute = this.fullRoute(schema);
            const validation = tv4.validateMultiple(json, tv4.getSchema(schemaRoute), true);
            if (validation.valid && validation.missing.length === 0) {
                resolve();
            } else {
                reject(new JsonSchemaError(schema, json, validation));
            }
        });
    }

    public validateFor(schema) {
        return (req, res, next) => {
            this.validate(schema, req.body)
                .then(() => next())
                .catch(JsonSchemaError, (e) => {
                    res.status(400).json(errorView(e));
                })
                .catch(next);
        };
    }
}

const baseDir = `${config.get("schema.path").replace(/\/$/, "")}/`;
export default new JsonSchemaValidator(baseDir);
