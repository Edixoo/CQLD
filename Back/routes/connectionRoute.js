const express = require('express');
const connectionController = require('../controllers/connectionController');  

const router = express.Router();

router.get('/', connectionController.listConnections);
router.post('/', connectionController.createConnection);
router.get('/theme/:id', connectionController.getConnectionByTheme);
router.get('/approved', connectionController.getConnectionByApproved)
router.get('/int/:id', connectionController.getConnectionByIdInt)
router.get('/:id', connectionController.getConnectionById);
router.put('/:id', connectionController.updateConnection);
router.delete('/:id', connectionController.deleteConnection);
router.get('/list/:word', connectionController.getConnexionContainWord);

module.exports = router;
