import {Request} from "express";
import * as logger from "morgan";

logger.token("req-info", (req: Request) => {
    const context = req.context || {};

    let log = context.flow_reference ? context.flow_reference : "EMPTY-FLOW-REFERENCE";
    log += ` ${context.request_id}`;

    return log;
});

logger.format("production", ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :req-info');

export default logger;
