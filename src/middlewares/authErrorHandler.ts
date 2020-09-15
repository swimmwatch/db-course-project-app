import {
    NextFunction,
    Request,
    Response,
} from "express";

interface AuthError {
    status: number,
    message: string
}

export default function (err: AuthError, req: Request, res: Response, next: NextFunction): void {
    const { status } = err;

    res.status(status).json(err);
}