import jwt from 'jsonwebtoken';

const ACCESS_TOKEN = process.env.ACCESS_TOKEN || '';

interface IUser {
	login: string;
	password: string;
}
const generateToken = (user: IUser) => {
	const payload = user;
	const token = jwt.sign(payload, ACCESS_TOKEN);

	return token;
};

export default generateToken;
