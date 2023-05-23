import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import config from './config';
import router from './router';
import cors from 'cors';

const server: Express = express();
const port = config.port;

mongoose.set('strictQuery', true);
mongoose
	.connect(config.database)
	.then(() => console.log('Connected to DATABASE'))
	.catch((error) => {
		console.log('Failed connection to DATABASE');
		console.log(error);
	});

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

server.get('/', (req: Request, res: Response) => {
	res.send('Siema👋');
});

// routes
server.use('/api', router);

server.listen(port, () => console.log(`⚡️[server]: Server is running at http://localhost:${port}`));
