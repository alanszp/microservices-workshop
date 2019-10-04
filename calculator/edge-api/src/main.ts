import * as http from "http";
import app from "./app";
import config from "./config";
import log from "./logger";

log.debug("spin_up", { message: "Spinning up" });

const port = config.get("port");
let server;

http.globalAgent.maxSockets = 100;

server = http.createServer(app);
server.listen(port, () => {
  log.info("server_listen", {
    env: config.get("env"),
    post: port,
    ssl: true,
    message: `Listening on port ${port} in ${config.get("env")} mode`,
  });
});
