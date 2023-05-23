"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTest = (req, res) => {
    res.status(200).json({ working: true });
};
exports.default = { getTest };
