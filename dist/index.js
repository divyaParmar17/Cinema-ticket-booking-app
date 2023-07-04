"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const cinemaRoutes_1 = __importDefault(require("./routes/cinemaRoutes"));
const logger_1 = __importDefault(require("./utils/logger"));
const responseMessage_1 = require("./utils/responseMessage");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
app.use(cinemaRoutes_1.default);
// Database connection
(0, dbConfig_1.default)().then(() => {
    app.listen(port, () => {
        logger_1.default.info(`${responseMessage_1.ResponseMessages.SERVER_RUNNING} ${port}`);
    });
});
