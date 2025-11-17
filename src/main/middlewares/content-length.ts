import { HttpStatusCode } from "../../data/protocols/http";

export const checkContentLength = (req: any, res: any, next: Function) => {
    const maxLength = 1024;

    if (req.headers['content-length'] && Number(req.headers['content-length']) > maxLength)
        return res.status(HttpStatusCode.PayloadTooLarge).send('Payload too large');

    return next();
}