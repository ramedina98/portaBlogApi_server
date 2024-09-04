import { Request, Response, NextFunction } from "express";

export const routeNotFound = (_req: Request, res: Response, _next: NextFunction) => {
    const error: any = new Error('Route not found');

    logging.error(error);

    return res.status(404).json({ error });
};