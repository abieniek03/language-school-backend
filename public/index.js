"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const router_1 = __importDefault(require("./router"));
const cors_1 = __importDefault(require("cors"));
const server = (0, express_1.default)();
const port = config_1.default.port;
mongoose_1.default.set('strictQuery', true);
mongoose_1.default
    .connect(config_1.default.database)
    .then(() => console.log('Connected to DATABASE'))
    .catch((error) => {
    console.log('Failed connection to DATABASE');
    console.log(error);
});
server.use(express_1.default.urlencoded({ extended: true }));
server.use(express_1.default.json());
server.use((0, cors_1.default)());
server.get('/', (req, res) => {
    res.send('Siema👋');
});
// routes
server.use('/', router_1.default);
server.listen(port, () => console.log(`⚡️[server]: Server is running at http://localhost:${port}`));
