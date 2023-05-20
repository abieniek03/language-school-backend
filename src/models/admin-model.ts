import mongoose, { Document, Schema } from 'mongoose';
import bcrypt, { hash } from 'bcrypt';

export interface IAdmin {
	login: string;
	password: string;
}

export interface IAdminModel extends IAdmin, Document {}

const adminSchema: Schema = new Schema(
	{
		login: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ versionKey: false }
);

adminSchema.path('password').set((password: string) => {
	const salt = bcrypt.genSaltSync(10);
	const hashPassword = bcrypt.hashSync(password, salt);
	return hashPassword;
});

export default mongoose.model<IAdminModel>('Admin', adminSchema);
