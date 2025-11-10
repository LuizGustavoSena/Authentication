import tooBusy from 'toobusy-js';
import { HttpStatusCode } from '../../data/protocols/http';

export const tooBusyCheck = async (req: any, res: any, next: any) => {
    if (!tooBusy()) return next();

    res.status(HttpStatusCode.ServiceUnavailable).send('Server too busy');
}