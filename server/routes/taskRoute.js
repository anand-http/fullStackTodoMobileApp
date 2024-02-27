import express from 'express';
import { addTask, removeTask, updateTask } from '../controllers/taskController.js';
import isAuthenticated from '../middleware/auth.js'


const router = express.Router();


router.route('/add-task').post(isAuthenticated, addTask);
router.route('/remove-task/:taskid').delete(isAuthenticated, removeTask);
router.route('/update-task/:taskid').put(isAuthenticated, updateTask);


export default router;