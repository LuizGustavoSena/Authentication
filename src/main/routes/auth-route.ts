import express from "express";
import { makeRemoteAccountController } from "../factories/controllers/remote-account";
import { makeRemoteRefreshTokenControler } from "../factories/controllers/remote-refresh-token";
import { makeRemoteValidateTokenControler } from "../factories/controllers/remote-validate-token";

const router = express.Router();
const remoteAccountController = makeRemoteAccountController();
const remoteRefreshTokenController = makeRemoteRefreshTokenControler();
const remoteValidateTokenController = makeRemoteValidateTokenControler();

router.post('/create_account', remoteAccountController.createAccount);
router.post('/login_account', remoteAccountController.loginAccount);

router.get('/validate_token', remoteValidateTokenController.validateToken);
router.post('/refresh_token', remoteRefreshTokenController.refreshToken);

export default router;