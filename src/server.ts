import Fastify from 'fastify';
import * as AccountControler from './main/controllers/remote-account';
import * as ValidateControler from './main/controllers/remote-validate-token';

const fastify = Fastify({
    logger: true
});

fastify.post('/create', AccountControler.createAccount);

fastify.post('/login', AccountControler.loginAccount);

fastify.get('/validate', ValidateControler.validateToken);

fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})