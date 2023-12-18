require('dotenv/config');
import cors from '@fastify/cors';
import Fastify from 'fastify';
import https from 'https';
import * as AccountControler from './main/controllers/remote-account';
import * as ValidateControler from './main/controllers/remote-validate-token';

const fastify = Fastify({
    logger: true
});

fastify.register(cors, {
    origin: (origin, cb) => {
        if (process.env.ENVIRONMENT === 'development' || new URL(origin).hostname === process.env.URL_WEB_SITE) {
            cb(null, true);
            return;
        };

        cb(new Error("Not allowed"), false);
    }
});

fastify.post('/create_account', AccountControler.createAccount);

fastify.post('/login_account', AccountControler.loginAccount);

fastify.get('/validate_token', ValidateControler.validateToken);

fastify.get('/', (_, rep) => {
    console.log('Ping received');

    rep.send();
});

setInterval(() => {
    if (process.env.ENVIRONMENT === 'production')
        https.get(process.env.URL_API_AUTHENTICATION);
}, Number(process.env.MINUTES_REQUEST) * 60 * 1000);

fastify.listen({
    port: Number(process.env.PORT) || 3000,
    host: '0.0.0.0',
}, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})