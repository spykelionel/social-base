const http = require('http');
const app = require("./app");
const config = require('./config/env.config');
const logger = require('./config/logger.config')

const server = http.createServer(app);

server.listen(config.PORT, ()=>{
    logger.info(`Server running on port: ${config.PORT} @ http://localhost:${config.PORT}`)
})