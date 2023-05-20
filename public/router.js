"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const student_controler_1 = __importDefault(require("./controlers/student-controler"));
const admin_controler_1 = __importDefault(require("./controlers/admin-controler"));
const router = express_1.default.Router();
// studnet
router.get('/students', student_controler_1.default.getAllStudents);
router.get('/students-name/:name', student_controler_1.default.getStudentsByName);
router.get('/students-group/:group', student_controler_1.default.getStudentsByGroup);
router.get('/students-name-group/:name/:group', student_controler_1.default.getStudentsByNameAndGroup);
router.get('/student-profile/:id', student_controler_1.default.getStudentProfileData);
router.get('/student-delete/:id', student_controler_1.default.deleteStudent);
router.post('/student-register', student_controler_1.default.registerStudent);
//admin
router.post('/admin-register', admin_controler_1.default.registerAdmin);
router.post('/admin-login', admin_controler_1.default.loginAdmin);
module.exports = router;
