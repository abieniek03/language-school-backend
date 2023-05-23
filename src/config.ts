import dotenv from 'dotenv';

dotenv.config();

const config = {
	port: process.env.PORT || 3500,
	database: process.env.DATABASE || 'mongodb+srv://admin:admin@atlascluster.ofgz5hd.mongodb.net/sjo',
};

export default config;
