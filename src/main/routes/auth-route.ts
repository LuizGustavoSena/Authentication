import express from "express";
import { makeRemoteAccountController } from "../factories/controllers/remote-account";

const router = express.Router();
const remoteAccountController = makeRemoteAccountController();

router.post('/create_account', remoteAccountController.createAccount);
router.post('/login_account', remoteAccountController.loginAccount);

export default router;