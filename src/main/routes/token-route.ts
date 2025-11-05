import express from "express";
import { makeRemoteValidateTokenControler } from "../factories/controllers/remote-validate-token";

const router = express.Router();
const remoteValidateTokenController = makeRemoteValidateTokenControler();

router.get('/validate_token', remoteValidateTokenController.validateToken);

export default router;