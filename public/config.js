"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    port: process.env.PORT || 3500,
    database: process.env.DATABASE || 'mongodb+srv://admin:admin@atlascluster.ofgz5hd.mongodb.net/sjo',
};
exports.default = config;
