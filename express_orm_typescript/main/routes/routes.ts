import express from 'express';
import mainController from '../controller/mainController';
 import prismaController from '../controller/prismaController';
import path from "path";

const router = express.Router();
//sequelize
router.post(
	'/create',
	mainController.create
);
router.get(
	'/get/:user_id',
	mainController.retrieve
);
router.put(
	'/update/:user_id',
	mainController.update
);
router.delete(
	'/delete/:user_id',
	mainController.delete
);
router.get(
	'/getAll',
	mainController.retrieveAll
);

//for prisma
router.post(
	'/prisma-create',
	prismaController.create
);
router.get(
	'/prisma-get/:user_id',
	prismaController.retrieve
);
router.put(
	'/prisma-update/:user_id',
	prismaController.update
);
router.delete(
	'/prisma-delete/:user_id',
	prismaController.delete
);
router.get(
	'/prisma-getAll',
	prismaController.retrieveAll
);
export default router;