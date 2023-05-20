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
const student_model_1 = __importDefault(require("../models/student-model"));
const registerStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = yield student_model_1.default.find({ email: req.body.email });
    if (validation.length === 0) {
        const newStudent = new student_model_1.default({
            id: new mongoose_1.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            group: req.body.group,
            address: req.body.address,
            postalCode: req.body.postalCode,
            city: req.body.city,
            email: req.body.email,
            phone: req.body.phone,
        });
        return newStudent
            .save()
            .then((newStudent) => res.status(201).json({ newStudent }))
            .catch((error) => res.status(500).json({ error }));
    }
    else {
        res.status(406).json({ communicate: 'Zarejestrowano już konto na podany adres mailowy.' });
    }
});
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allStudents = yield student_model_1.default.find({});
    if (allStudents.length !== 0) {
        return res.status(200).json({ allStudents });
    }
    else {
        return res.status(404).json({ commnicate: 'Nie znaleziono żadnego ucznia.' });
    }
});
const getStudentsByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield student_model_1.default.find({
        $or: [
            { firstName: { $regex: req.url.split('/')[2], $options: 'i' } },
            { lastName: { $regex: req.url.split('/')[2], $options: 'i' } },
        ],
    });
    if (students.length !== 0) {
        return res.status(200).json({ students });
    }
    else {
        return res.status(404).json({ commnicate: 'Nie znaleziono żadnego ucznia w tej grupie.' });
    }
});
const getStudentsByGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield student_model_1.default.find({ group: req.url.split('/')[2] });
    if (students.length !== 0) {
        return res.status(200).json({ students });
    }
    else {
        return res.status(404).json({ commnicate: 'Nie znaleziono żadnego ucznia w tej grupie.' });
    }
});
const getStudentsByNameAndGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield student_model_1.default.find({
        $and: [
            {
                $or: [
                    { firstName: { $regex: req.url.split('/')[2], $options: 'i' } },
                    { lastName: { $regex: req.url.split('/')[2], $options: 'i' } },
                ],
                group: req.url.split('/')[3],
            },
        ],
    });
    if (students.length !== 0) {
        return res.status(200).json({ students });
    }
    else {
        return res.status(404).json({ commnicate: 'Nie znaleziono żadnego ucznia w tej grupie.' });
    }
});
const getStudentProfileData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentProfileData = yield student_model_1.default.find({ _id: req.url.split('/')[2] });
    if (studentProfileData.length !== 0) {
        return res.status(200).json(...studentProfileData);
    }
    else {
        return res.status(404).json({ commnicate: 'Nie znaleziono takiego użytkownika.' });
    }
});
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield student_model_1.default.deleteOne({ _id: req.url.split('/')[2] });
        return res.status(200);
    }
    catch (error) {
        console.log(error);
        return res.status(500);
    }
});
exports.default = {
    registerStudent,
    getAllStudents,
    getStudentsByName,
    getStudentsByGroup,
    getStudentsByNameAndGroup,
    getStudentProfileData,
    deleteStudent,
};
