import { Request, Response } from 'express';

const getTest = (req: Request, res: Response) => {
	res.status(200).json({ working: true });
};

export default { getTest };
