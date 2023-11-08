const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController');
router.route('/add').post(projectController.addProject);
router.route('/projects').get(projectController.getAllProjects);
router.route('/edit/:id').put(projectController.editProject);

router
    .route('/:id')
    .put(projectController.statusChange)
    .delete(projectController.deleteProject);

module.exports = router;