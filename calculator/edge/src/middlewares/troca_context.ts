import * as cuid from "cuid";
import {NextFunction, Request, Response} from "express";
import log from "../logger";

export default function trocaContext(req: Request, res: Response, next: NextFunction) {
    req.context = req.context || {};

    req.context.request_id = cuid();
    req.context.flow_reference = req.headers["x-flow-reference"] || req.context.request_id;

    req.log = log.child({
        request_id: req.context.request_id,
        flow_reference: req.context.flow_reference,
    });

    return next();
}
