import express from 'express';
import testControler from './controlers/test-controler';
import studentControler from './controlers/student-controler';
import adminControler from './controlers/admin-controler';

const router = express.Router();

// test
router.get('/test', testControler.getTest);

// studnet
router.get('/students', studentControler.getAllStudents);
router.get('/students-name/:name', studentControler.getStudentsByName);
router.get('/students-language/:language', studentControler.getStudentsByLanguage);
router.get('/students-name-language/:name/:language', studentControler.getStudentsByNameAndLanguage);
router.get('/student-profile/:id', studentControler.getStudentProfileData);
router.get('/student-delete/:id', studentControler.deleteStudent);
router.post('/student-register', studentControler.registerStudent);

//admin
router.post('/admin-register', adminControler.registerAdmin);
router.post('/admin-login', adminControler.loginAdmin);

export = router;
