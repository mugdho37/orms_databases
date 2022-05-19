const express = require('express');
const mainController = require('../controller/mainController');

const router = express.Router();
//sequelize
router.post(
	'/create',
	mainController.create
);
router.post(
	'/create-project',
	mainController.create_project
);
router.post(
	'/user-join-project',
	mainController.userJoinProject
);
router.get(
	'/get',
	mainController.get
);
router.get(
	'/getbyId/:id',
	mainController.getbyId
);
router.get(
	'/get-project/:id',
	mainController.fetchProjects
);
router.put(
	'/update/:id',
	mainController.update
);
router.delete(
	'/delete/:id',
	mainController.delete
);
// router.get(
// 	'/getAll',
// 	mainController.getAll
// );

module.exports = router;