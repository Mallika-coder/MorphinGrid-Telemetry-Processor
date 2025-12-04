require('dotenv').config();
const app = require('./app');
const http = require('http');
const { initSocket } = require('./socket');
const server = http.createServer(app);

const PORT = process.env.PORT || 4000;
initSocket(server);

server.listen(PORT, () => console.log(`Backend running on ${PORT}`));