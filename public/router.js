"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const test_controler_1 = __importDefault(require("./controlers/test-controler"));
const student_controler_1 = __importDefault(require("./controlers/student-controler"));
const admin_controler_1 = __importDefault(require("./controlers/admin-controler"));
const router = express_1.default.Router();
// test
router.get('/test', test_controler_1.default.getTest);
// studnet
router.get('/students', student_controler_1.default.getAllStudents);
router.get('/students-name/:name', student_controler_1.default.getStudentsByName);
router.get('/students-language/:language', student_controler_1.default.getStudentsByLanguage);
router.get('/students-name-language/:name/:language', student_controler_1.default.getStudentsByNameAndLanguage);
router.get('/student-profile/:id', student_controler_1.default.getStudentProfileData);
router.get('/student-delete/:id', student_controler_1.default.deleteStudent);
router.post('/student-register', student_controler_1.default.registerStudent);
//admin
router.post('/admin-register', admin_controler_1.default.registerAdmin);
router.post('/admin-login', admin_controler_1.default.loginAdmin);
module.exports = router;
