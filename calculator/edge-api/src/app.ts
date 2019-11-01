import * as bodyParser from "body-parser";
import * as express from "express";
import * as fs from "fs";
import * as _ from "lodash";
import * as path from "path";
import "reflect-metadata";
import "reflect-metadata";
import * as requireTree from "require-tree";
import config from "./config";
import log from "./logger";
import requestLogger from "./middlewares/request_logger";
import trocaContext from "./middlewares/troca_context";
import utilRoutes from "./routes/utils";
import errorView from "./views/error_view";
import InternalServerError from "./errors/http/internal_server_error";
import NotFoundError from "./errors/http/not_found_error";

import cors from "./middlewares/cors";

class App {
    public express: any;

    constructor() {
        this.express = express();
        this.accessLogs();
        this.addRootMiddleware();
        this.mountRoutes();
        this.errorHandling();
    }

    public accessLogs() {
        if (config.get("log.enabled")) {
            if (config.get("log.path")) {
                const fileName = path.resolve(config.get("log.path"), config.get("log.access_file_name"));
                const accessLogStream = fs.createWriteStream(fileName, {flags: "a"});
                this.express.use(requestLogger("production", {stream: accessLogStream}));
            }
            this.express.use(requestLogger("dev"));
        }
    }

    public addRootMiddleware() {
        log.trace("configure_middleware", {message: "Configuring middleware"});
        this.express.use(bodyParser.json());
        this.express.use(cors);

        this.express.use(trocaContext);
    }

    public mountRoutes() {
        log.trace("configure_routes", {message: "Configuring routes"});

        this.express.use("/utils", utilRoutes);

        const routesV1 = requireTree("./routes/v1");
        _.forIn(routesV1, (route, name) => {
            this.express.use(`/tenant/v1/${name}`, route.default);
        });
    }

    public errorHandling() {
        log.trace("configure_error_handlers", {message: "Configuring error handlers"});

        this.express.use((req, res, next) => {
            return res.status(404)
                .json(errorView(new NotFoundError()));
        });

        this.express.use((err, req, res, next) => {
            req.log.error("error_to_client", {err});
            next(err);
        });

        this.express.use((err, req, res, next) => {
            if (config.get("env") === "development") {
                return res.status(500)
                    .json(errorView(new InternalServerError(err)));
            } else {
                return res.status(500)
                    .json(errorView(new InternalServerError()));
            }

        });
    }

    public getExpressConfiguration() {
        return this.express;
    }
}

log.trace("configure_complete", {message: "App ready"});
export default new App().express;
