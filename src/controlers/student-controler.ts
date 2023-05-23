import { Request, Response } from 'express';
import { Types } from 'mongoose';

import studentModel from '../models/student-model';

const registerStudent = async (req: Request, res: Response) => {
	const validation = await studentModel.find({ email: req.body.email });

	if (validation.length === 0) {
		const newStudent = new studentModel({
			id: new Types.ObjectId(),
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			language: req.body.language,
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
	} else {
		res.status(406).json({ communicate: 'Zarejestrowano już konto na podany adres mailowy.' });
	}
};

const getAllStudents = async (req: Request, res: Response) => {
	const allStudents = await studentModel.find({});

	if (allStudents.length !== 0) {
		return res.status(200).json({ allStudents });
	} else {
		return res.status(404).json({ commnicate: 'Nie znaleziono żadnego ucznia.' });
	}
};

const getStudentsByName = async (req: Request, res: Response) => {
	const students = await studentModel.find({
		$or: [
			{ firstName: { $regex: req.url.split('/')[2], $options: 'i' } },
			{ lastName: { $regex: req.url.split('/')[2], $options: 'i' } },
		],
	});

	if (students.length !== 0) {
		return res.status(200).json({ students });
	} else {
		return res.status(404).json({ commnicate: 'Nie znaleziono żadnego ucznia w tej grupie.' });
	}
};

const getStudentsByLanguage = async (req: Request, res: Response) => {
	const students = await studentModel.find({ language: req.url.split('/')[2] });

	if (students.length !== 0) {
		return res.status(200).json({ students });
	} else {
		return res.status(404).json({ commnicate: 'Nie znaleziono żadnego ucznia w tej grupie.' });
	}
};

const getStudentsByNameAndLanguage = async (req: Request, res: Response) => {
	const students = await studentModel.find({
		$and: [
			{
				$or: [
					{ firstName: { $regex: req.url.split('/')[2], $options: 'i' } },
					{ lastName: { $regex: req.url.split('/')[2], $options: 'i' } },
				],
				language: req.url.split('/')[3],
			},
		],
	});

	if (students.length !== 0) {
		return res.status(200).json({ students });
	} else {
		return res.status(404).json({ commnicate: 'Nie znaleziono żadnego ucznia w tej grupie.' });
	}
};

const getStudentProfileData = async (req: Request, res: Response) => {
	const studentProfileData = await studentModel.find({ _id: req.url.split('/')[2] });

	if (studentProfileData.length !== 0) {
		return res.status(200).json(...studentProfileData);
	} else {
		return res.status(404).json({ commnicate: 'Nie znaleziono takiego użytkownika.' });
	}
};

const deleteStudent = async (req: Request, res: Response) => {
	try {
		await studentModel.deleteOne({ _id: req.url.split('/')[2] });
		return res.status(200);
	} catch (error) {
		console.log(error);
		return res.status(500);
	}
};

export default {
	registerStudent,
	getAllStudents,
	getStudentsByName,
	getStudentsByLanguage,
	getStudentsByNameAndLanguage,
	getStudentProfileData,
	deleteStudent,
};
