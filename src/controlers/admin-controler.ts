import { Request, Response } from 'express';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';

import adminModel from '../models/admin-model';
import generateToken from '../utils/generateToken';

const registerAdmin = async (req: Request, res: Response) => {
	const validation = await adminModel.find({ login: req.body.login });

	if (validation.length === 0) {
		const newAdmin = new adminModel({
			id: new Types.ObjectId(),
			login: req.body.login,
			password: req.body.password,
		});

		return newAdmin
			.save()
			.then((newAdmin) => {
				const token = generateToken({ login: req.body.login, password: req.body.password });
				return res.status(201).json({ newAdmin, token });
			})
			.catch((error) => res.status(500).json({ error }));
	} else {
		res.status(406).json({ communicate: 'Istnieje już taki administrator.' });
	}
};

const loginAdmin = async (req: Request, res: Response) => {
	const admin = await adminModel.findOne({ login: req.body.login });

	if (!admin) {
		return res.status(406).json({ communicate: 'Nie istnieje takie konto administratora.' });
	}

	if (bcrypt.compareSync(req.body.password, admin.password)) {
		const token = generateToken({ login: req.body.login, password: req.body.password });

		return res.status(200).json({ admin, token });
	} else {
		return res.status(401).json({ communicate: 'Błędne hasło.' });
	}
};

export default {
	registerAdmin,
	loginAdmin,
};
