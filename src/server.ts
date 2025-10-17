import cors from '@fastify/cors';
import Fastify from 'fastify';
import https from 'https';
import { env } from './infra/zod/env';
import { makeRemoteAccountController } from './main/factories/controllers/remote-account';
import { makeRemoteValidateTokenControler } from './main/factories/controllers/remote-validate-token';

const remoteAccountController = makeRemoteAccountController();
const remoteValidateTokenController = makeRemoteValidateTokenControler();

const fastify = Fastify({
    logger: true
});

fastify.register(cors, {
    origin: (origin, cb) => {
        if (env.NODE_ENV === 'development' || new URL(origin).hostname === env.URL_WEB_SITE) {
            cb(null, true);
            return;
        };

        cb(new Error("Not allowed"), false);
    }
});

fastify.post('/create_account', remoteAccountController.createAccount);

fastify.post('/login_account', remoteAccountController.loginAccount);

fastify.get('/validate_token', remoteValidateTokenController.validateToken);

fastify.get('/', (_, rep) => {
    console.log('Ping received');

    rep.send();
});

if (env.NODE_ENV === 'production') {
    setInterval(() => {
        https.get(env.URL_API_AUTHENTICATION);
    }, Number(env.MINUTES_REQUEST) * 60 * 1000);
}

fastify.listen({
    port: env.PORT || 3000,
    host: '0.0.0.0',
}, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})