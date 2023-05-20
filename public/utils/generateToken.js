"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || '';
const generateToken = (user) => {
    const payload = user;
    const token = jsonwebtoken_1.default.sign(payload, ACCESS_TOKEN);
    return token;
};
exports.default = generateToken;
