import * as convict from "convict";
import {Config} from "convict";
import { resolve } from "path";

const appName = "edge-api";

const conf: Config<any> = convict({
  env: {
    default: "development",
    doc: "The applicaton environment",
    format: ["production", "staging", "development", "test"],
    env: "NODE_ENV",
  },
  port: {
    default: 9443,
    doc: "Port",
    format: "port",
    env: "API_PORT",
  },
  client: {
    timeout: {
      default: 5000,
      doc: "API client timeout",
      format: "int",
      env: "API_CLIENT_TIMEOUT",
    },
  },
  log: {
    enabled: {
      default: true,
      doc: "Enable logging",
      format: Boolean,
      env: "API_LOG_ENABLED",
    },
    console_level: {
      default: "trace",
      doc: "Logging level for console logging",
      format: String,
      env: "API_CONSOLE_LOG_LEVEL",
    },
    file_level: {
      default: "trace",
      doc: "Logging level for file logging",
      format: String,
      env: "API_FILE_LOG_LEVEL",
    },
    path: {
      default: resolve(__dirname, "../logs"),
      doc: "Logs path",
      format: String,
      env: "API_LOG_PATH",
    },
    app_file_name: {
      default: `${appName}_app.log`,
      doc: "Logs file name for app log",
      format: String,
      env: "API_APP_LOG_FILE_NAME",
    },
    access_file_name: {
      default: `${appName}_access.log`,
      doc: "Logs file name for access log",
      format: String,
      env: "API_ACCESS_LOG_FILE_NAME",
    },
    type_name: {
      default: `${appName}_app_log`,
      doc: "Log type name for app logs. It's used to identify the logs of this app between others",
      format: String,
      env: "API_LOG_TYPE_NAME",
    },
    file_rotate: {
      default: true,
      doc: "Enable log rotation",
      format: Boolean,
      env: "API_LOG_FILE_ROTATE",
    },
    file_rotate_days: {
      default: 1,
      doc: "Log rotation",
      format: "int",
      env: "API_LOG_FILE_ROTATION_DAYS",
    },
    file_rotate_keep: {
      default: 7,
      doc: "Log keep x files from rotation",
      format: "int",
      env: "API_LOG_FILE_KEEP_COUNT",
    },
  },
  schema: {
    path: {
      default: resolve(__dirname, "schemas"),
      doc: "JSON schema path",
      format: String,
      env: "API_JSON_SCHEMA_PATH",
    },
  },
  origin_name: {
    default: appName,
    doc: "API origin name. This will identify your app in the error response view.",
    format: String,
    env: "API_ORIGIN_NAME",
  },
});

conf.loadFile(`${__dirname}/config/${conf.get("env")}.json`);
conf.validate({ allowed: "strict" });

export default conf;
