"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const admin_model_1 = __importDefault(require("../models/admin-model"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const registerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = yield admin_model_1.default.find({ login: req.body.login });
    if (validation.length === 0) {
        const newAdmin = new admin_model_1.default({
            id: new mongoose_1.Types.ObjectId(),
            login: req.body.login,
            password: req.body.password,
        });
        return newAdmin
            .save()
            .then((newAdmin) => {
            const token = (0, generateToken_1.default)({ login: req.body.login, password: req.body.password });
            return res.status(201).json({ newAdmin, token });
        })
            .catch((error) => res.status(500).json({ error }));
    }
    else {
        res.status(406).json({ communicate: 'Istnieje już taki administrator.' });
    }
});
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield admin_model_1.default.findOne({ login: req.body.login });
    if (!admin) {
        return res.status(406).json({ communicate: 'Nie istnieje takie konto administratora.' });
    }
    if (bcrypt_1.default.compareSync(req.body.password, admin.password)) {
        const token = (0, generateToken_1.default)({ login: req.body.login, password: req.body.password });
        return res.status(200).json({ admin, token });
    }
    else {
        return res.status(401).json({ communicate: 'Błędne hasło.' });
    }
});
exports.default = {
    registerAdmin,
    loginAdmin,
};
