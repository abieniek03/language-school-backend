import mongoose, { Document, Schema } from 'mongoose';

export interface IStudent {
	firstName: string;
	lastName: string;
	group: string;
	address: string;
	postalCode: string;
	city: string;
	email: string;
	phone: string;
}

export interface IStudentModel extends IStudent, Document {}

const studentSchema: Schema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		group: {
			type: Number,
			required: true,
		},
		address: {
			type: String,
			required: true,
			trim: true,
		},
		postalCode: {
			type: String,
			required: true,
			trim: true,
		},
		city: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},
		phone: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ versionKey: false }
);

export default mongoose.model<IStudentModel>('Student', studentSchema);
