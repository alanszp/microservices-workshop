let cors = require("cors");

export default cors({
    origin: '*',
    optionsSuccessStatus: 200,
});