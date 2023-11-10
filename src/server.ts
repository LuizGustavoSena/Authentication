import { BbPrismaClient } from "./infra/bdClient/bdPrismaClient";

const dbClient = new BbPrismaClient();

const execute = async () => {
    await dbClient.createUser({
        email: 'luizgbs1@gmail.com',
        password: 'password',
        username: 'LuizBs'
    });

    console.log('deu certo');
}

execute();