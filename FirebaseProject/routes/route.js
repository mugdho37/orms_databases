const express = require('express');
const mainController = require('../controller/mainController');

const router = express.Router();
//sequelize
router.post(
	'/create',
	mainController.create
);
router.get(
	'/get',
	mainController.get
);
router.get(
	'/getbyId',
	mainController.getbyId
);
// router.put(
// 	'/update/:user_id',
// 	mainController.update
// );
// router.delete(
// 	'/delete/:user_id',
// 	mainController.delete
// );
// router.get(
// 	'/getAll',
// 	mainController.getAll
// );

module.exports = router;