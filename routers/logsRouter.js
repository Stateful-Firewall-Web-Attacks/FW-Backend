const logsController = require('../controllers/logsController');
const { Router } = require('express');
const logsRouter = new Router();

// GET
logsRouter.get('/initial-logs', logsController.initialLogs);
logsRouter.get('/updated-logs', logsController.getUpdatedLogs);


// PUT
// logsRouter.post('/add-log', logsController.add_log);

module.exports = { logsRouter };
