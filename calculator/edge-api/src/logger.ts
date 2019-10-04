import * as bunyan from "bunyan";
import {Stream} from "bunyan";
import * as bformat from "bunyan-format";
import * as path from "path";
import config from "./config";

/* Based on Bunyan error serializer */
function getFullErrorStack(ex) {
    let ret = ex.stack || ex.toString();
    if (ex.cause && typeof (ex.cause) === "function") {
        const cex = ex.cause();
        if (cex) {
            ret += `\nCaused by: ${getFullErrorStack(cex)}`;
        }
    }
    return (ret);
}

/* Based on Bunyan error serializer */
function errorSerializer(err) {
    if (!err || !err.stack) {
        return err;
    }

    return {
        message: err.message,
        name: err.name,
        code: err.code,
        context: err.context,
        status: err.status,
        signal: err.signal,
        devMessage: err.devMessage,
        stack: getFullErrorStack(err),
    };
}

const consoleStream: Stream = {
    level: config.get("log.console_level") || "error",
    stream: bformat({outputMode: "short", color: false, levelInString: true}),
};

const streams: Stream[] = [
    consoleStream,
];

if (config.get("log.path")) {

    const fileStream: Stream = {
        level: config.get("log.file_level") || "error",
        path: path.resolve(config.get("log.path"), config.get("log.app_file_name")),
    };

    if (config.get("log.file_rotate")) {
        fileStream.type = "rotating-file";
        fileStream.period = `${config.get("log.file_rotate_days")}d`;
        fileStream.count = config.get("log.file_rotate_keep");
    }

    streams.push(fileStream);
}

const bunyanLogger = bunyan.createLogger({
    name: config.get("log.type_name"),
    streams,
    serializers: {
        err: errorSerializer,
        error: errorSerializer,
    },
});

export class Logger {

    public baseLogger: any;

    constructor(baseLogger) {
        this.baseLogger = baseLogger;
    }

    public log(type, code, context: any = {}) {
        context.code = code;
        return this.baseLogger[type](context);
    }

    public trace(code, context?) {
        return this.log("trace", code, context);
    }

    public debug(code, context?) {
        return this.log("debug", code, context);
    }

    public info(code, context?) {
        return this.log("info", code, context);
    }

    public warn(code, context?) {
        return this.log("warn", code, context);
    }

    public error(code, context?) {
        return this.log("error", code, context);
    }

    public child(obj) {
        return new Logger(this.baseLogger.child(obj));
    }
}

export default new Logger(bunyanLogger);
